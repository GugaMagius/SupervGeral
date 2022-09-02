
var enviaEmail = require('../../services/enviaEmail');
var pjson = require('../../../package.json');
const ads = require('ads-client');
var main = require('../../../main')
var bd = require('../../BD/server')
const contatos = require('../../../contatos');


// Inicializa variáveis para tentativas de conexão
var envioEmail = false;
var tentatConex = 0;


console.log("INICIANDO PLC PINTURA PÓ")

/*
// Enviar e-mail ao inicializar servidor
enviaEmail( // Chama função e envia e-mail
    "Iniciado Servidor", // Assunto do e-mail
    "Iniciado Servidor do supervisório na versão: " + pjson.version,
    contatos.administrador.nome,
    contatos.administrador.email
);
*/

// Configurações do Target do CLP para acesso via ADS (ADS precisa estar instalado no PC)
const clientPLC_PP = new ads.Client({
    targetAmsNetId: '5.88.201.147.1.1', //'5.42.86.72.1.1', // Ecoat, '5.88.201.147.1.1', // Pintura pó
    targetAdsPort: 851,
    autoReconnect: false
});



/* #Teste!
// Opção para conexão sem o ADS da Beckhoff
const clientPLC_PP = new ads.Client({
    localAmsNetId: '10.41.2.31.1.1',                         // '192.168.1.114.1.1',     //Can be anything but needs to be in PLC StaticRoutes.xml file
    localAdsPort: 32751,                    //Can be anything that is not used
    targetAmsNetId: '5.88.201.147.1.1',       // Target CLP Pintura pó/líquida
    targetAdsPort: 851,
    routerAddress: '10.41.1.67',            //PLC ip address
    routerTcpPort: 48898,                   //PLC needs to have this port opened. Test disabling all firewalls if problems
    allowHalfOpen: true,
    autoReconnect: false
})

*/


var recon // Variavel para Timeout de reconexão
var iVerificaStatus // Variavel para Interval de verifica-status

// Reconecta CLP após o período determinado
function reconectar(tempo) {
    //console.log("Iniciando contagem de tempo para reconectar o PLC da pintura pó em ", tempo / 1000, "segundos")
    recon = setTimeout(conectarPP, tempo);
}


// Inicia conexão com o CLP
conectarPP();
//desconectar();



async function srvGravaVariavel(variavel, valor) {
    return new Promise(
        async function (resolve, reject) {
            //console.log("iniciando gravação no plc.... ", variavel, valor)
            try {
                const res = await clientPLCEstufaPo.writeSymbol(variavel, valor);
                resolve(res);
            } catch (err) {
                let msgErro = "falha ao gravar variável no CLP da pintura pó: " + variavel + " - Erro: " + err
                bd.insertBD("log", msgErro)
                console.log(msgErro)
                reject(err)
            }


        }
    )
}
module.exports.srvGravaVariavel = srvGravaVariavel


// MONITOR DO STATUS DO CLP
async function verificaStatus() {
    var resposta = '';
    try {
        resposta = await clientPLC_PP.readPlcRuntimeState()
        console.log("resposta do status do CLP da pintura Pó: ", resposta)
    } catch (err) {
        let msgErro = "falha ao verificar o status do CLP da pintura pó: " + " - Erro: " + err
        bd.insertBD("log", msgErro)
        console.log(msgErro)
        reconectar(30000)
        clearInterval(iVerificaStatus)
        return

    }
}
 
async function desconectar() {
    try {

        clientPLC_PP.disconnect().then((resp)=>{
            console.log("Desconexão realizada com sucesso",resp)

        })
    } catch (err) {
        let msgErro = "falha ao desconectar o CLP da pintura pó: " + " - Erro: " + err
        bd.insertBD("log", msgErro)
        console.log(msgErro)
    }
}

function criaInterval() {
    iVerificaStatus = setInterval(verificaStatus, 10000); // Inicia verificação de status periódica
}


// Conexão com o CLP
async function conectarPP() {

    try {

        /*
        clientPLC_PP.unsubscribeAll().catch(function (err) {
            let msgErro = "Falha ao apagar subscrição de variáveis no CLP da Pintura Pó: " + err
            console.log(msgErro)
        })
        */

        clientPLC_PP.connect()
            .then((resp) => {
                // Inicia instância para monitorar as variáveis do processo e atualizar os valores 
                console.log("CONEXÃO COM O CLP PINTURA PÓ REALIZADA COM SUCESSO!!! ")
                clearTimeout(recon)
                
                criaInterval();


                console.log("RESPOSTA NA TENTATIVA DE CONEXÃO",resp)

                tentatConex = 0; // reinicia tentativa de conexão
                envioEmail = false; // reinicia flag de envio de e-mail


                // LEITURA DAS VARIAVEIS DO CLP (CRIAR SUBSCRIÇÃO DAS VARIÁVEIS)
                // Varre variáveis para aquisção com o CLP
                main.listaAtualizada().then(
                    function (val) {
                        var Variaveis = val
                        //console.log("INICIANDO FOR PARA VARIAVEIS DO CLP DA PINTURA PÓ: ", Variaveis)
                        for (const Variavel of Object.entries(Variaveis)) {
                            if (Variavel[1].modulo === "PLCPinturaPo") {
                                //console.log("Modulo: " + JSON.stringify(Variavel[1]))
                                iniciarVariaveis(Variavel)
                            }
                        }
                        //console.log("LISTA DE VARIAVEIS: " + JSON.stringify(val))
                        return val
                    }
                )


                // Cria subscrição das variáveis para atualização pelo CLP 
                function iniciarVariaveis(iVariavel) {

                    // eslint-disable-next-line no-unused-vars
                    let subscription = clientPLC_PP.subscribe(iVariavel[1].endereco, (data, sub) => {
                        let tVariavel = iVariavel
                        //console.log("VARIAVEL RECEBIDA: " + JSON.stringify(iVariavel))
                        //Note: The sub parameter is the same as returned by clientPLC_PP.subcribe()
                        //console.log(`${data.timeStamp}: Value OF ${tVariavel[1].endereco} changed to ${data.value}`);

                        try {
                            main.tratDados(tVariavel, data.value);
                        } catch (err) {
                            main.tratDados(tVariavel, 0)
                            let msgErro = "FALHA NO TRATAMENTO DA VARIÁVEL DO CLP da Pintura pó: " + " - Erro: " + err
                            bd.insertBD("log", msgErro)
                            console.log(msgErro)
                        }

                        //console.log("VARIAVEL INSTANCIADA: " + JSON.stringify(tVariavel))
                    }, 5000)
                        .catch(err => {
                            let msgErro = 'Falha ao ler variável do CLP da Pintura pó: ' + iVariavel[1].endereco + err
                            bd.insertBD("log", msgErro)
                            enviaEmail( // Chama função e envia e-mail
                                "Leitura de Variáveis",
                                msgErro,
                                contatos.administrador.nome,
                                contatos.administrador.email
                            );
                            console.log(msgErro)
                            return
                        })
                }
            })


            .catch((erro) => {
                console.log("Falha ao conectar ao CLP da pintura Pó" + erro)

                //clientPLC_PP.disconnect();
                console.log(" Iniciar nova tentativa de conexão em 15 segundos... ", tentatConex)
                reconectar(15000)
                tentatConex++;

                if (envioEmail === false && tentatConex > 1100) {
                    let msgErro = "Excedido tentativas de conexão com o CLP da Pintura pó: " + " - Erro: " + err
                    bd.insertBD("log", msgErro)
                    console.log(msgErro)
                    try {
                        enviaEmail( // Chama função e envia e-mail
                            "Falha de conexão com o CLP Pintura Po", // Assunto do e-mail
                            msgErro,
                            contatos.administrador.nome,
                            contatos.administrador.email
                        );
                        envioEmail = true;

                    } catch (err) {
                        let msgErro = "Falha ao enviar e-mail de alerta de tentativas de conexão com o CLP da Pintura pó: " + " - Erro: " + err
                        bd.insertBD("log", msgErro)
                        console.log(msgErro)
                    }
                }
                return
            })
    } catch (err) {
        let msgErro = "FALHA AO CONECTAR AO CLP DA PINTURA PÓ: " + " - Erro: " + err
        bd.insertBD("log", msgErro)
        console.log(msgErro)
    }
}



module.exports
