
var enviaEmail = require('../../services/enviaEmail');
var main = require('../../../main')
var bd = require('../../BD/server')
const contatos = require('../../../contatos');
const EndereçoWise1 = "10.41.1.222"


// Inicializa variáveis para tentativas de conexão
var envioEmail = false; // Variavel para sinalizar envio de e-mail
var tentatConex = 0; // Variavel para registrar número de tentativas de reconexão
var vReconectar = ''; // Variavel para setTimeout para reconectar
var leitura = ''; // Variavel para setInterval para leitura das variáveis do processo
var flagConnect = false; // Variavel para sinalizar conexão com o módulo



console.log("INICIANDO Modbus")

// create an empty modbus client
var ModbusTCP = require("modbus-serial");
const e = require('cors');
var client = new ModbusTCP();

var networkErrors = ["ESOCKETTIMEDOUT", "ETIMEDOUT", "ECONNRESET", "ECONNREFUSED", "EHOSTUNREACH"];

// CONEXÃO COM O MODULO I/O ADAM WISE
function conectar(status) {
    console.log("Status das variáveis: envioEmail=",envioEmail," / tentaConex=",tentatConex," / flagConnect=",flagConnect)
    // open connection to a tcp line 
    try {
        client.connectTCP(EndereçoWise1)
            .then(client.setID(1))
            .then(function () {
                console.log("Módulo 1 Conectado");
                envioEmail=false;
                flagConnect = true;
                tentatConex = 0;
                clearTimeout(vReconectar);
                iniciarVariaveis();
            })
            .catch(function (e) {
                //reconectar();
                if (e.errno) {
                    if (networkErrors.includes(e.errno)) {
                        let msgErro = "FALHA AO CONECTAR AO MÓDULO MODBUS" + e.errno
                        if (flagConnect === true) {
                            flagConnect = false;
                            bd.insertBD("log", msgErro)
                        }
                        console.log(msgErro)
                    }
                }
                let msgErro = "FALHA AO CONECTAR AO MÓDULO MODBUS" + e;
                if (flagConnect === true) {
                    flagConnect = false;
                    bd.insertBD("log", msgErro)
                }
                console.log(msgErro)
            });
    } catch (err) {
        let msgErro = "FALHA AO CONECTAR AO MÓDULO MODBUS" + err;
        if (flagConnect === true) {
            flagConnect = false;
            bd.insertBD("log", msgErro)
        }
        console.log(msgErro)
    }

}

try {
    conectar()
} catch (err) {
    let msgErro = "Falha ao conectar ao módulo Adam! tentativa: " + tentatConex + " - Erro número: " + err
    bd.insertBD("log", msgErro)
    console.log(msgErro)
/*
    if (tentatConex > 60) {
        try {
            if (envioEmail === false) {
                enviaEmail( // Chama função e envia e-mail
                    "Leitura de Variáveis",
                    "Falha ao conectar ao Modbus " + ", Tentativa nro.: " + tentatConex + " - Erro: " + e.message,
                    contatos.administrador.nome,
                    contatos.administrador.email

                );
                envioEmail = true;
                tentatConex = 0;
            }

        } catch (err) {
            let msgErro = "FALHA AO ENVIAR E-MAIL: " + err;
            bd.insertBD("log", msgErro)
            console.log(msgErro)
        }
    } else {

        tentatConex = tentatConex + 1;

    }
    */
}

function reconectar() {
    vReconectar = setTimeout(conectar, 60000) // Tentar reconectar após 60 segundos
}

// ROTINA PARA DESCONECTAR O MÓDULO
function desconectar() {
    
    clearInterval(leitura)
    try {
        console.log("Desconectando I/O... ")
        client.destroy(EndereçoWise1).then(()=>{

                
        console.log("I/O Desconectado!")
            
        });
    } catch (err) {
        let msgErro = "FALHA AO DESCONECTAR AO MÓDULO MODBUS" + err
        bd.insertBD("log", msgErro)
        console.log(msgErro)
    }
    reconectar()

}


// ROTINA PARA AQUISIÇÃO DOS VALORES (SETINTERVAL)
function adquireValor(iVariavel) {

    leitura = setInterval(readAI, iVariavel[1].periodoAq)

    function readAI() {

        try {
            client.readHoldingRegisters(0, 7).then(
                function (valor) {
                    //console.log("Valor obtido do módulo Modbus da Caixa d`água do refeitório (Wise1): ", valor.data[iVariavel[1]["endereco"]])
                    main.tratDados(iVariavel, valor.data[iVariavel[1]["endereco"]]);

                }
            )
                .catch(function (e) {
                    clearInterval(leitura)
                    desconectar();
                    let msgErro = "ERRO AO TRATAR VARIÁVEL DO MODBUS: " + e.message
                    bd.insertBD("log", msgErro)
                    console.log(msgErro)
                })

        } catch (err) {
            clearInterval(leitura)
            let msgErro = "ERRO AO FAZER A LEITURA DA VARIÁVEL DO MODBUS: " + e.message
            bd.insertBD("log", msgErro)
            console.log(msgErro)
            /*
            if (envioEmail === false) {
                enviaEmail( // Chama função e envia e-mail
                    "Leitura de Variáveis",
                    msgErro,
                    contatos.administrador.nome,
                    contatos.administrador.email
                );

                envioEmail = true
            }
            */
        }

    }

}


// LEITURA DAS VARIAVEIS DO MODBUS
function iniciarVariaveis() {
    // Varre variáveis para aquisção com o CLP
    try {
        main.listaAtualizada().then(
            function (val) {
                var Variaveis = val
                //console.log("INICIANDO FOR PARA VARIAVEIS DO MODBUS: " + JSON.stringify(Variaveis))
                for (const Variavel of Object.entries(Variaveis)) {
                    if (Variavel[1].modulo === "WISE1") {
                        //console.log("Modulo: " + JSON.stringify(Variavel[1]))
                        adquireValor(Variavel)
                    }
                    //iniciarBD(Variavel)
                    //console.log("MENSAGEM ENVIADA: "+Variavel[1].mensagem)
                }
                //console.log("LISTA DE VARIAVEIS: " + JSON.stringify(val))
                return val
            }
        )
    } catch (err) {
        let msgErro = "ERRO AO ATUALIZAR VARIÁVEL DO MODBUS: " + e.message
        bd.insertBD("log", msgErro)
        console.log(msgErro)
    }

}
