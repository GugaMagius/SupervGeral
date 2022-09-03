var main = require('../../../main')
var bd = require('../../BD/server')
const EndereçoWise1 = "10.41.1.222"
const socketIO = require('../../socket/server')


// Inicializa variáveis para tentativas de conexão
var envioEmail = false; // Variavel para sinalizar envio de e-mail
var tentatConex = 0; // Variavel para registrar número de tentativas de reconexão
var vReconectar = ''; // Variavel para setTimeout para reconectar
var leitura = ''; // Variavel para setInterval para leitura das variáveis do processo
var flagConnect = false; // Variavel para sinalizar conexão com o módulo

var flagFalha = false

function falhaConexao(msg) {

    socketIO.statusConnect.auditorio = false
    console.log(msg)
    flagFalha === false ? storage.setLS("log", msg) : flagFalha
    flagFalha = true;

}


console.log("INICIANDO Modbus")

// create an empty modbus client
var ModbusTCP = require("modbus-serial");
const e = require('cors');
var client = new ModbusTCP();

var networkErrors = ["ESOCKETTIMEDOUT", "ETIMEDOUT", "ECONNRESET", "ECONNREFUSED", "EHOSTUNREACH"];

// CONEXÃO COM O MODULO I/O ADAM WISE
function conectar(status) {
    // open connection to a tcp line 
    try {
        client.connectTCP(EndereçoWise1)
            .then(client.setID(1))
            .then(function () {

                console.log("Módulo MODBUS 1 Conectado");
                socketIO.statusConnect.auditorio = true;
                flagFalha=false;
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
                        falhaConexao(msgErro)
                    }
                }
                let msgErro = "FALHA AO CONECTAR AO MÓDULO MODBUS" + e;
                falhaConexao(msgErro)
            });
    } catch (err) {
        let msgErro = "FALHA AO CONECTAR AO MÓDULO MODBUS" + err;
        falhaConexao(msgErro)
    }

}

try {
    conectar()
} catch (err) {
    let msgErro = "Falha ao conectar ao módulo Adam! tentativa: " + tentatConex + " - Erro número: " + err
    falhaConexao(msgErro)
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

                    socketIO.statusConnect.auditorio = true;

                    main.tratDados(iVariavel, valor.data[iVariavel[1]["endereco"]]);

                }
            )
                .catch(function (e) {
                    clearInterval(leitura)
                    desconectar();
                    let msgErro = "ERRO AO TRATAR VARIÁVEL DO MODBUS: " + e.message
                    falhaConexao(msgErro)
                })

        } catch (err) {
            clearInterval(leitura)
            let msgErro = "ERRO AO FAZER A LEITURA DA VARIÁVEL DO MODBUS: " + e.message
            falhaConexao(msgErro)
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
                
                for (const Variavel of Object.entries(Variaveis)) {
                    if (Variavel[1].modulo === "WISE1") {
                        
                        adquireValor(Variavel)
                    }
                    
                }
                
                return val
            }
        )
    } catch (err) {
        let msgErro = "ERRO AO ATUALIZAR VARIÁVEL DO MODBUS: " + e.message
        falhaConexao(msgErro)
    }

}
