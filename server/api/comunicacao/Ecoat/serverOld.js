
var enviaEmail = require('../../services/enviaEmail');
var pjson = require('../../../package.json');
const ads = require('ads-client');
var main = require('../../../main')
var bd = require('../../BD/server')
const contatos = require('../../../contatos');


// Inicializa variáveis para tentativas de conexão
var envioEmail = false;
var tentatConex = 0;
var statusConnect = false;


console.log("INICIANDO PLC DO ECOAT")

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
const clientPLCecoat = new ads.Client({
    targetAmsNetId: '5.42.86.72.1.1', //'5.42.86.72.1.1', // Ecoat, '5.88.201.147.1.1', // Pintura pó
    targetAdsPort: 851,
    autoReconnect: false
});




/* #Teste!

// Opção para conexão sem o ADS da Beckhoff
const clientPLCecoat = new ads.Client({
    localAmsNetId: '10.41.2.31.1.1',  //'192.168.23.130.1.1',     //Can be anything but needs to be in PLC StaticRoutes.xml file
    localAdsPort: 32750,                    //Can be anything that is not used
    targetAmsNetId: '5.42.86.72.1.1',       // Target CLP Ecoat
    targetAdsPort: 851,
    routerAddress: '10.41.1.50',            //PLC ip address
    routerTcpPort: 48898,                   //PLC needs to have this port opened. Test disabling all firewalls if problems
    allowHalfOpen: true,
    autoReconnect: false
})


*/


var recon = '' // Variavel para Timeout de reconexão
var iVerificaStatus = '' // Variavel para Interval de verifica-status

// Reconecta CLP após o período determinado
function reconectar(tempo) {
    //console.log("Iniciando contagem de tempo para reconectar o PLC do E-coat em ", tempo / 1000, "segundos")
    recon = setTimeout(conectarEcoat, tempo);
}


// Inicia conexão com o CLP
conectarEcoat();



// MONITOR DO STATUS DO CLP
async function verificaStatus() {
    var resposta = '';
    try {
        resposta = await clientPLCecoat.readPlcRuntimeState()
        console.log("resposta do status do CLP do Ecoat ", resposta)
        statusConnect = true;
    } catch (err) {
        let msgErro = "Falha ao verificar o status do PLC do Ecoat: "
        statusConnect = false;
        bd.insertBD("log", msgErro, err)
        console.log(msgErro, err)
        reconectar(30000)
        clearInterval(iVerificaStatus)
        return
    }

}

async function desconectar() {
    try {
        clientPLCecoat.disconnect()
        statusConnect = false
    } catch (err) {
        let msgErro = "Falha ao desconectar o PLC do Ecoat: " + err
        bd.insertBD("log", msgErro)
        console.log(msgErro)
    }
}
module.exports.desconectar = desconectar



function criaInterval() {
    iVerificaStatus = setInterval(verificaStatus, 10000); // Inicia verificação de status periódica
}


// Conexão com o CLP
async function conectarEcoat() {

    try {

        /* Provisorio
        clientPLCecoat.unsubscribeAll().catch(function (err) {
            let msgErro = "Falha ao apagar subscrição de variáveis no CLP do E-coat: " + err
            console.log(msgErro)
        })
        */

        clientPLCecoat.connect()
            .then((resp) => {
                // Inicia instância para monitorar as variáveis do processo e atualizar os valores 
                console.log("CONEXÃO COM O CLP DO E-COAT REALIZADA COM SUCESSO!!! ")
                statusConnect = true;
                clearTimeout(recon)
                
                criaInterval();

                console.log(resp)

                tentatConex = 0; // reinicia tentativa de conexão
                envioEmail = false; // reinicia flag de envio de e-mail




                // LEITURA DAS VARIAVEIS DO CLP (CRIAR SUBSCRIÇÃO DAS VARIÁVEIS)
                // Varre variáveis para aquisção com o CLP

                main.listaAtualizada().then(
                    function (val) {
                        var Variaveis = val
                        //console.log("INICIANDO FOR PARA VARIAVEIS DO CLP: "+JSON.stringify(Variaveis))
                        for (const Variavel of Object.entries(Variaveis)) {
                            if (Variavel[1].modulo === "PLCecoat") {
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
                    let subscription = clientPLCecoat.subscribe(iVariavel[1].endereco, (data, sub) => {
                        let tVariavel = iVariavel
                        //console.log("VARIAVEL RECEBIDA: " + JSON.stringify(iVariavel))
                        //Note: The sub parameter is the same as returned by clientPLCecoat.subcribe()
                        //console.log(`${data.timeStamp}: Value OF ${tVariavel[1].endereco} changed to ${data.value}`);
                      
                        try {
                            main.tratDados(tVariavel, data.value);
                        } catch (err) {
                            main.tratDados(tVariavel, 0)
                            let msgErro = "FALHA NO TRATAMENTO DA VARIÁVEL DO CLP do Ecoat: " + " - Erro: " + err
                            bd.insertBD("log", msgErro)
                            console.log(msgErro)
                        }

                        //console.log("VARIAVEL INSTANCIADA: " + JSON.stringify(tVariavel))
                    }, 5000)
                        .catch(err => {
                            let msgErro = 'Falha ao ler variável do CLP do Ecoat: ' + iVariavel[1].endereco + err
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
                console.log("Falha ao conectar ao CLP do Ecoat" + erro)
                
                if (statusConnect === true) {
                    desconectar();
                }

                //clientPLCecoat.disconnect();
                console.log(" Iniciar nova tentativa de conexão em 15 segundos... ", tentatConex)
                reconectar(15000)
                tentatConex++;

                if (envioEmail === false && tentatConex > 1100) {
                    let msgErro = "Excedido tentativas de conexão com o CLP do E-coat: " + " - Erro: " + err
                    bd.insertBD("log", msgErro)
                    console.log(msgErro)
                    try {
                        enviaEmail( // Chama função e envia e-mail
                            "Falha de conexão CLP Ecoat", // Assunto do e-mail
                            msgErro,
                            contatos.administrador.nome,
                            contatos.administrador.email
                        );
                        envioEmail = true;

                    } catch (err) {
                        let msgErro = "Falha ao enviar e-mail de alerta de tentativas de conexão com o CLP do E-coat: " + " - Erro: " + err
                        bd.insertBD("log", msgErro)
                        console.log(msgErro)
                    }
                }
                return
            })
    } catch (err) {
        let msgErro = "FALHA AO CONECTAR AO CLP DO E-COAT: " + err
        bd.insertBD("log", msgErro)
        console.log(msgErro)
    }
}



module.exports
