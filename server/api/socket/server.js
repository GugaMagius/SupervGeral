
// ***********************
// Configurações em geral*
// ***********************
//const { error } = require('console')
console.log("INICIANDO IO")

var cors = require('cors')
//const app = require('express')()
var express = require('express')
var app = express()
app.use(cors());
const http = require('http').createServer(app)
//const { Console } = require('console');
//const io = require('socket.io')(http)
const main = require('../../main')
//const PLC = require('../PLC/server')
const BD = require('../BD/server')

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


io.on('connection', (socket) => {
    console.log("socket iniciado")
    socketConectado = true

    console.log('New connection', socket.id)

    
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
        //console.log("LISTA ATUALIZADA PELO PLC>>>>> " + JSON.stringify(val))
    })

    var Falhas = new Promise(
        function (resolve, reject) {
            resolve(main.listaFalhas())
        })

    Falhas.then(function (val) {
        atualizaFalhas(val)
    })

    function atualizaFalhas(lista) {
        socket.emit("falhas", lista)
        //console.log("<<<<<< LISTA FALHAS ENVIADA PELO PLC >>>>> " + JSON.stringify(lista))
    }
    module.exports.atualizaFalhas = atualizaFalhas


    // **********************************
    // *            WATCHDOG            *
    // ********************************** 

    // Atualiza Watchdog a cada ciclo configurado
    setInterval(function() {
        socket.emit('watchdog')
    }, 1000)

    // ************************************************************************
    // Cliente solicitando consulta de dados ao Banco de Dados para o Gráfico *
    // ************************************************************************
    socket.on("SolicitaDados", function([variavel, filtro, data1, data2, index]) {
        console.log("####### Solicitado dados pelo cliente na tabela: ", variavel.tabela, "- filtro: ", filtro, " - INDEX: ", index)
        BD.selectBD(variavel.tabela, filtro, data1, data2, index).then(
            
            function(val) {
                let data = [];
                let valor = [];
                //console.log("RESPOSTA DO BANCO DE DADOS", val.recordset)

                function listaValores () {
                    return new Promise (
                        function(resolve, reject) {
                            
                        console.log("RESPOSTA DO BANCO DE DADOS PARA A TABELA: ", variavel.tabela, " VALORES: ", val.recordset)
                        
                            val.recordset.forEach(element => {

                                data.push(element.data.toLocaleString('en-GB', { timeZone: 'UTC' }));
                                valor.push(element.valor);
                                
                                //console.log("Data: ", element.data ,"Valor capturado: ", element.valor)
                            });
                            resolve([data, valor, index, variavel])
                        }
                    )
  
                }

                listaValores().then(
                    function(val) {
                        //console.log(JSON.stringify(val))
                        //console.log("*************************RESPOSTA FILTRADA PARA A TABELA: ", variavel.tabela, " COM OS SEGUINTES VALORES: ", JSON.stringify(val))

                        socket.emit("resConsDB", val)
                    }
                )

            }
        )
    })
    

    // *************************************************************************
    // Cliente solicitando consulta de dados ao Banco de Dados para o DataView *
    // *************************************************************************
    socket.on("SolicitaDadosDV", function([variavel, filtro, data1, data2, index]) {
        console.log("####### Solicitado dados pelo cliente na tabela: ", variavel.tabela, "- filtro: ", filtro, " - INDEX: ", index)
        BD.selectBD(variavel.tabela, filtro, data1, data2, index).then(
            
            function(val) {
                
                        console.log("RESPOSTA DO BANCO DE DADOS PARA A TABELA: ", variavel.tabela, " VALORES: ", val.recordset)

                        //console.log(JSON.stringify(val))
                        //console.log("*************************RESPOSTA FILTRADA PARA A TABELA: ", variavel.tabela, " COM OS SEGUINTES VALORES: ", JSON.stringify(val.recordsets[0]))

                        socket.emit("resConsDBdv", val.recordsets[0])

            }
        )
    })

    var atualizaCliente = function(Variavel, val, cor) {
        return new Promise(
            function (resolve, reject) {
                //console.log("Iniciando atualização no cliente da variavel: " + Variavel[0] + " - Valor: " + val + " - Cor: " + cor);

                try {
                    io.emit('atualiza', [Variavel[0], val, cor]);

                } catch (err) {
                    //console.error("falha ao conectar a cliente: " + err);
                    reject("falha ao conectar a cliente: " + err);
                }
                finally {
                    //console.log("Atualizado variável: " + Variavel[1].endereco + " - valor: " + val);
                    resolve("Atualizado variável: " + Variavel[1].endereco + " - valor: " + val);
                }
            }
        )
    }
    module.exports.atualizaCliente = atualizaCliente
})

module.exports.io = io
