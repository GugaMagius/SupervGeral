
// ***********************
// Configurações em geral*
// ***********************
console.log("INICIANDO IO")

var cors = require('cors')
var express = require('express')
var app = express()
app.use(cors());
const http = require('http').createServer(app)
const main = require('../../main')
const mestre = require('../../server')
const BD = require('../BD/server')
var statusConnect = { ecoat: false, pinturapo: false, auditorio: false }
module.exports.statusConnect = statusConnect

const PLCecoat = require('../comunicacao/Ecoat/server')
const PLCpinturapo = require('../comunicacao/PinturaPo/server')
const MDLauditorio = require('../comunicacao/Modbus/server')

const storage = require('../services/storage')

var socketConectado = false; // Status de conexão do socket


// *************************
// Configurações do socket *
// *************************
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

http.listen(3004, function () {
    console.log("listening on port 3004")
})


function verifConexao() {
    return socketConectado
}
module.exports.verifConexao = verifConexao

// ########################################################################
// ************************************************************************
//                     Início da conexão com o SOCKET 
// ************************************************************************
// ########################################################################


// Monitora clientes que foram desconectados e fecha a conexão socket
io.sockets.on('disconnect', function () {
    // handle disconnect
    io.sockets.disconnect();
    io.sockets.close();
});


// **********************************
// *            WATCHDOG            *
// ********************************** 

// Atualiza Watchdog a cada ciclo configurado
setInterval(function () {
    io.emit('watchdog', statusConnect)
}, 3000)


// Atualiza valores no cliente
var atualizaCliente = function (Variavel, val, cor) {
    return new Promise(
        function (resolve, reject) {

            try {
                io.emit('atualiza', [Variavel[0], val, cor]);

            } catch (err) {
                reject("falha ao conectar a cliente: " + err);
            }
            finally {
                resolve("Atualizado variável: " + Variavel[1].endereco + " - valor: " + val);
            }
        }
    )
}
module.exports.atualizaCliente = atualizaCliente



io.on('connection', (socket) => {
    console.log("socket iniciado")
    socketConectado = true

    console.log('New connection', socket.id)

    storage.getLS("contatos").then((res)=>{

        console.log("lista de contatos: ", res)

        socket.emit("contatos", res)

    })


    // **********************************
    // Atualização da lista de variáveis*
    // ********************************** 

    // Envia lista de variáveis com os valores atualizados
    var Lista = new Promise(
        function (resolve, reject) {
            resolve(main.listaAtualizada())
        })

    Lista.then(function (val) {
        socket.emit("inicializaVar", val)
    })

    // Atualiza falhas presentes nos sistemas
    var Falhas = new Promise(
        function (resolve, reject) {
            resolve(main.listaFalhas())
        })

    Falhas.then(function (val) {
        atualizaFalhas(val)
    })

    function atualizaFalhas(lista) {
        socket.emit("falhas", lista)
    }
    module.exports.atualizaFalhas = atualizaFalhas


    // ************************************************************************
    // Cliente solicitando consulta de dados ao Banco de Dados para o Gráfico *
    // ************************************************************************
    socket.on("SolicitaDados", function ([variavel, filtro, data1, data2, index]) {

        BD.selectBD(variavel.tabela, filtro, data1, data2, index).then(

            function (val) {
                let data = [];
                let valor = [];

                function listaValores() {
                    return new Promise(
                        function (resolve, reject) {

                            val.recordset.forEach(element => {

                                data.push(element.data.toLocaleString('en-GB', { timeZone: 'UTC' }));
                                valor.push(element.valor);

                            });
                            resolve([data, valor, index, variavel])
                        }
                    )

                }

                listaValores().then(
                    function (val) {
                        socket.emit("resConsDB", val)
                    }
                )

            }
        )
    })


    // *************************************************************************
    // Cliente solicitando consulta de dados ao Banco de Dados para o DataView *
    // *************************************************************************
    socket.on("SolicitaDadosDV", function ([variavel, filtro, data1, data2, index]) {

        BD.selectBD(variavel.tabela, filtro, data1, data2, index).then(

            function (val) {
                socket.emit("resConsDBdv", val.recordsets[0])

            }
        )
    })

    socket.on("conectar", setor => {
        if (setor === 'ecoat') {

            mestre.instModlEcoat;

        } else if (setor === 'pinturapo') {

            mestre.instModlPP;

        } else if (setor === 'auditorio') {

            mestre.instModlAuditorio;

        }
    })

    socket.on("desconectar", setor => {
        if (setor === 'ecoat') {


            PLCecoat.clientPLCecoat.disconnect();

        } else if (setor === 'pinturapo') {

            PLCpinturapo.clientPLC_PP.disconnect();

        } else if (setor === 'auditorio') {

            MDLauditorio.fecharConexao();
        }
        console.log("Recebido comando para desconectar o setor: ", setor)
    })

    socket.on("consultaLog", () => {

        storage.getLS("log").then(res => {

            socket.emit("respLog", res)

        }
        )

    })

    
    socket.on("consultaConfig", () => {

        storage.getLS("config").then(res => {

            socket.emit("respConfig", res)

        }
        )

    })

    
    socket.on("salvaConfig", (valConfig) => {

        storage.setLS("config", valConfig)

        
    })

    socket.on("salvaContatos", (listaContatos) => {

        storage.setLS("contatos", listaContatos)

        
    })
})

module.exports.io = io
