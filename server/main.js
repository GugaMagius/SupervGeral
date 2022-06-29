var Variaveis = require('./Eqptos').Variaveis;
var socketFl = require('./api/socket/server');
var bd = require('./api/BD/server');

const corOK = "Lightgreen"
const corAlerta = "#ffff66"
const corFalha = "#ff5c33"

console.log("INICIANDO MAIN")

//var SQL = require('../BD/server')
const enviaEmail = require('./api/services/enviaEmail')
const enviaTelefone = require('./api/services/enviaTelefone');
const enviaSMS = require('./api/services/enviaSMS');
const contatos = require('./contatos'); // Arquivo de configuração 
const { json } = require('express');
var Falhas = {}; // Lista de falhas


function listaAtualizada() {
    //console.log("iniciando PROMISE para enviar Variaveis", Variaveis)
    return new Promise(
        function (resolve, reject) {
            resolve(Variaveis)
        }
    )
}

module.exports.listaAtualizada = listaAtualizada



function listaFalhas() {
    return Falhas
}
module.exports.listaFalhas = listaFalhas


// Atualiza cor de status para a variável
async function verificaStatus(dados) {
    return new Promise(
        function (resolve, reject) {
            //console.log("DADOS RECEBIDOS: " + dados[0])
            let Valor = dados[1]["valor"]

            try {

                if (Variaveis[dados[0]]["cor"] === undefined) {
                    //console.log("É uma variavel AUXILIAR: " + JSON.stringify(dados[0]) + " COR: " + Variaveis[dados[0]]["cor"])
                } else {
                    //console.log("É uma variavel final: " + dados[0])
                    //console.log("VALOR DA VARIAVEL: " + JSON.stringify(Variaveis[dados[0]]))
                    if (Variaveis[dados[0]]["SetPoint"] === undefined) {
                        let min2 = Variaveis[dados[0]]["min2"];
                        let min1 = Variaveis[dados[0]]["min1"];
                        let max1 = Variaveis[dados[0]]["max1"];
                        let max2 = Variaveis[dados[0]]["max2"];
                        let vMin2 = 0;
                        let vMin1 = 0;
                        let vMax1 = 0;
                        let vMax2 = 0;

                        try {
                            vMin2 = Variaveis[min2]["valor"];
                        } catch (err) {
                            //console.log("Erro ao acessar vMin2 da variável: " + Variaveis[dados[0]]);
                            vMin2 = 0;
                        }

                        try {
                            vMin1 = Variaveis[min1]["valor"];
                        } catch (err) {
                            //console.log("Erro ao acessar vMin1 da variável: " + Variaveis[dados[0]]);
                            vMin1 = 0;
                        }
                        try {
                            vMax1 = Variaveis[max1]["valor"];
                        } catch (err) {
                            vMax1 = 0;
                        }
                        try {
                            vMax2 = Variaveis[max2]["valor"];
                        } catch (err) {
                            vMax2 = 0;
                        }

                        // Se variável está dentro da faixa normal
                        if (((vMin1 <= Valor) || (vMin1 === 0)) && ((Valor <= vMax1) || (vMax1 === 0))) {
                            Variaveis[dados[0]]["cor"] = "Lightgreen";
                            resolve(Variaveis[dados[0]]["cor"]);
                        } else if (((vMin2 <= Valor) || (vMin2 === 0)) && ((Valor <= vMax2) || (vMax2 === 0))) {
                            Variaveis[dados[0]]["cor"] = "#ffff66"
                            resolve(Variaveis[dados[0]]["cor"]);
                            // Se a variável ultrapassou o limite inferior ou superior
                        } else {
                            Variaveis[dados[0]]["cor"] = "#ff5c33";
                            resolve(Variaveis[dados[0]]["cor"]);
                        }

                    } else {
                        let SP = Variaveis[dados[0]]["SetPoint"];
                        let valorSP = Variaveis[SP]["valor"];
                        let HistFunc = Variaveis[dados[0]]["hist_func"];
                        let valorHFunc = Variaveis[HistFunc]["valor"];
                        let HistFalha = Variaveis[dados[0]]["hist_falha"];
                        let valorHFalha = Variaveis[HistFalha]["valor"];


                        try {
                            if ((valorSP - valorHFunc) <= Valor && Valor <= (valorSP + valorHFunc)) {
                                Variaveis[dados[0]]["cor"] = corOK;
                                resolve(Variaveis[dados[0]]["cor"]);
                            } else if ((valorSP - valorHFalha) <= Valor && Valor <= (valorSP + valorHFalha)) {
                                Variaveis[dados[0]]["cor"] = corAlerta;
                                resolve(Variaveis[dados[0]]["cor"]);
                            } else {
                                Variaveis[dados[0]]["cor"] = corFalha;
                                resolve(Variaveis[dados[0]]["cor"]);
                            }
                        } finally {
                            //return Variaveis[dados[0]]["cor"];
                        }
                    }
                }
            } catch (err) {
                let msgErro = "Falha ao acessar a variável!!!" + err + " VARIAVEL: " + dados[0]
                bd.insertBD("log", msgErro)
                console.log(msgErro)
                reject(err)
            }
        }
    )

}
module.exports.verificaStatus = verificaStatus


// BANCO DE DADOS

function iniciarBD() {
    for (const Variavel of Object.entries(Variaveis)) {
        // Inicia gravação automática para as variáveis de gravação cíclica => "periodoBD > 0"
        if (Variavel[1].periodoBD > 0) {
            //console.log("INICIANDO SETINTERVAL PARA A VARIAVEL: ", Variavel[0], " Periodo: ", Variavel[1].periodoBD, " valor: ", Variaveis[Variavel[0]]["valor"])
            setInterval(atualizaBD, parseInt(Variavel[1].periodoBD) * parseInt(1000), Variavel[0])
        }


        // LIMPEZA DO BANCO DE DADOS
        // Calculo das datas de corte
        if (Variavel[1].periodoBD !== null && Variavel[1].periodoBD !== undefined) {
            //bd.limpaBD(Variavel[0],)
            let dataAtual = new Date;
            let dataAnterior = Date.parse(dataAtual) - (((Variavel[1].maxBD) * 1000 * 60 * 60 * 24))
            let dataAntCalc = new Date(dataAnterior)

            let AnoAnt = dataAntCalc.getFullYear()
            let MesAnt = dataAntCalc.getMonth() + 1
            let DiaAnt = dataAntCalc.getDate()


            let AnoAtl = dataAtual.getFullYear()
            let MesAtl = dataAtual.getMonth() + 1
            let DiaAtl = dataAtual.getDate()



            let dataAnterCons = "'" + AnoAnt + "-" + MesAnt + "-" + DiaAnt + " 00:00'"

            setInterval(bd.limpaBD, 86400000, Variavel[0], dataAnterCons) // Realiza a verificação diariamente (86400000 milisegundos)

        }



    }
}

iniciarBD();



function atualizaBD(nomeVariavel) {

    try {
        if (Variaveis[nomeVariavel]["tmpCondBD"] !== undefined && Variaveis[nomeVariavel]["tmpCondBD"] !== null) {
            bd.insertBD(nomeVariavel, Variaveis[nomeVariavel]["tmpCondBD"])
        } else {
            bd.insertBD(nomeVariavel, Variaveis[nomeVariavel]["valor"])
        }
    } catch (err) {
        let msgErro = 'falha ao inserir registro no banco de dados para a variável: ' + nomeVariavel + ' - Erro: ' + err
        enviaEmail( // Chama função e envia e-mail
            "Erro BD",
            msgErro,
            contatos.administrador.nome,
            contatos.administrador.email
        );
        console.log(msgErro)
    }
}



// Trata dados após alteração de valores
function tratDados(Variavel, valor) {



    try {

        // Função para escala do valor
        function escala(dado, escala) {
            return dado * escala;
        }

        // função para ponto decimal do valor
        function decimal(dado, casasDec) {
            return dado.toFixed(casasDec);
        }

        // Função para atualizar Variável
        function atualizaValorVariavel(variavelAtlz, valorAtlz) {
            return new Promise(
                function (resolve, reject) {


                    var grava = false

                    try {

                        function escalaDec() {
                            if (Variaveis[variavelAtlz]["escala"] != undefined) {

                                if (Variaveis[variavelAtlz]["casasDec"] != null) {
                                    Variaveis[variavelAtlz]["valor"] = decimal(escala(valorAtlz, Variaveis[variavelAtlz]["escala"]), Variaveis[variavelAtlz]["casasDec"]);
                                } else {
                                    Variaveis[variavelAtlz]["valor"] = escala(valorAtlz, Variaveis[variavelAtlz]["escala"]);
                                }
                                grava = true
                            } else {
                                if (Variaveis[variavelAtlz]["casasDec"] != null) {
                                    Variaveis[variavelAtlz]["valor"] = decimal(valorAtlz, Variaveis[variavelAtlz]["casasDec"]);
                                }
                                else {
                                    Variaveis[variavelAtlz]["valor"] = valorAtlz

                                }
                                grava = true
                            }
                            return [Variaveis[variavelAtlz]["valor"], grava]
                        }

                        function fCondBD(callback) {
                            callback;
                            //var grava = false
                            if (Variaveis[variavelAtlz]["condBD"] !== undefined) {

                                try {

                                    if (eval(`(${valorAtlz} ${Variaveis[variavelAtlz]["condBD"]})`)) {

                                        if (Variaveis[variavelAtlz]["flagBD"] === false) {
                                            Variaveis[variavelAtlz]["datHraUltDisp"] = new Date();
                                            Variaveis[variavelAtlz]["flagBD"] = true
                                            grava = false
                                            console.log("INICIANDO CONTAGEM DE TEMPO DE FALHA PARA VARIAVEL", variavelAtlz, " VALOR: ", valorAtlz, "boolean")

                                        } else {

                                            if (Variaveis[variavelAtlz]["borda"] === true) {
                                                if ((Variaveis[variavelAtlz]["datHraUltDisp"] !== null)) {
                                                    let tempoFalha = (new Date() - (Variaveis[variavelAtlz]["datHraUltDisp"])) / 1000;
                                                    Variaveis[variavelAtlz]["tmpCondBD"] = tempoFalha;
                                                    Variaveis[variavelAtlz]["datHraUltDisp"] = new Date();
                                                    Variaveis[variavelAtlz]["flagBD"] = true
                                                    grava = true
                                                }
                                            }
                                        }


                                    } else if ((Variaveis[variavelAtlz]["datHraUltDisp"] !== null) && (Variaveis[variavelAtlz]["flagBD"] === true)) {
                                        if (Variaveis[variavelAtlz]["borda"] === true) {
                                            Variaveis[variavelAtlz]["flagBD"] = false
                                        }
                                        let tempoCalc = (new Date() - (Variaveis[variavelAtlz]["datHraUltDisp"])) / 1000;
                                        console.log("##### Tempo de falha calculado para a variável: ", variavelAtlz, " - Valor: ", tempoCalc)
                                        Variaveis[variavelAtlz]["tmpCondBD"] = tempoCalc;
                                        Variaveis[variavelAtlz]["flagBD"] = false
                                        grava = true
                                    }
                                } catch (err) {
                                    console.log("FALHA AO GRAVAR VARIAVEL Null*****", err);
                                }

                                //console.log("****Variavel atualizada**** ",Variavel[0], " Valor: ", Variaveis[Variavel[0]]["valor"] )
                            } else {
                                grava = true
                            }
                            return [Variaveis[variavelAtlz]["valor"], grava]
                        }



                        if (Variaveis[variavelAtlz]["maxV"] != undefined && valorAtlz > Variaveis[variavelAtlz]["maxV"]) {
                            resolve(0, grava)

                        } else {

                            resolve(fCondBD(escalaDec()), grava)
                        }




                    } catch (err) {
                        console.log("!!!!!!!!!!!!!!!!! ERRO AO GRAVAR VARIAVEL ", variavelAtlz, " erro: ", err)

                    } finally {
                        //resolve(true)
                    }
                }
            )
        }

        // Atualiza valor com quantidades de pontos decimais pré-configurados



        //console.log("ATUALIZANDO o banco de dados para a VARIAVEL: ", Variavel[0])
        // Verifica registra em Banco de Dados => "periodoBD" > 0

        // Função para atualizar Variável
        function prAtualizaVariavel(variavelAtlz, valorAtlz) {
            return new Promise(
                function (resolve, reject) {
                    atualizaValorVariavel(variavelAtlz, valorAtlz).then(
                        function ([val, grava]) {

                            if (grava === true) {

                                if (Variaveis[Variavel[0]]["periodoBD"] === 0) {
                                    atualizaBD(Variavel[0]);
                                }
                            }

                            // Verifica se precisa atualizar cor e ENVIA valor atualizado para os clientes
                            if (Variaveis[Variavel[0]]["cor"] === undefined) {

                                try {
                                    socketFl.atualizaCliente(Variavel, val, undefined).then(
                                        function (res) {
                                            //console.log("RESPOSTA DO SOCKET: " + res)
                                            resolve("ok")
                                        }
                                    )

                                } catch (err) {
                                    console.log("erro ao atualizar o cliente: Verificar se existe algum cliente conectado!")
                                }
                            } else {

                                verificaStatus(Variavel, valor).then(
                                    function (res) {
                                        let tcor = res
                                        Variaveis[Variavel[0]]["cor"] = tcor
                                        //console.log("Cor atualizada: ", tcor)
                                        try {
                                            socketFl.atualizaCliente(Variavel, val, tcor).then(
                                                function (res) {
                                                    resolve("ok")
                                                    //console.log("RESPOSTA DO SOCKET: " + res)
                                                }
                                            )
                                        } catch (err) {
                                            //console.log("erro ao atualizar o cliente: " + err + " - Verificar se existe algum cliente conectado!")
                                        }
                                    }
                                )
                            }

                        }
                    )
                        .catch(
                            function (err) {
                                console.log("falha ao atualizar VALOR da variável: ", err)
                            }
                        )
                }
            )
        }




        prAtualizaVariavel(Variavel[0], valor).then(
            function (res) {
                var StatusConexao = socketFl.verifConexao()

                // Verifica se precisa enviar mensagem (Telefone, e-mail ou SMS) e atualiza também a lista de falhas presente
                if (Variaveis[Variavel[0]]["mensagem"] !== undefined) {


                    if (Variaveis[Variavel[0]]["flagAviso"] === false) {

                        if ((valor === true) || ((valor !== false) && (Variavel[1].cor === corFalha))) {
                            if (Variaveis[Variavel[0]]["avisar"] !== undefined) {
                                monitorIO(Variavel)
                                Variaveis[Variavel[0]]["flagAviso"] = true // indica que mensagem já foi enviada
                                console.log("Enviado mensagem de alerta para a variável: ", Variavel)
                            }

                            // atualiza mensagem de falha na tela
                            Falhas[Variavel[0]] = Variaveis[Variavel[0]]["mensagem"];

                            if (StatusConexao === true) {
                                console.log("ATUALIZADO SOCKET PARA INSERIR A FALHA", Falhas)
                                socketFl.atualizaFalhas(Falhas)
                            }

                        } else

                            if (((valor !== true) && (Variavel[1].cor !== corFalha))) {

                                Variaveis[Variavel[0]]["flagAviso"] = false // reinicia informação de mensagem enviada

                                delete Falhas[Variavel[0]]; // excluí falha da lista

                                if (StatusConexao === true) {
                                    console.log("ATUALIZADO SOCKET PARA RETIRAR A FALHA", Falhas)
                                    socketFl.atualizaFalhas(Falhas)
                                }
                            }

                    }


                }
            }
        )

    } catch (err) {
        let msgErro = "FALHA NO TRATAMENTO DA VARIÁVEL " + variavelAtlz + " - erro: " + err
        bd.insertBD("log", msgErro)
        console.log(msgErro)
    }


}
module.exports.tratDados = tratDados


// Envia mensagens de SMS, e-mail ou Voz (telefone)
function monitorIO(Variavel) {

    try {
        for (const avisar of Variavel[1].avisar) { // Lista todas as pessoas a serem avisadas
            for (const resp of contatos.responsavel) { // Lista os responsáveis cadastrados para obter telefone e email
                console.log(resp.nome + " - " + avisar.nome);
                //console.log(avisar.nome);
                if (resp.nome == avisar.nome) { // Verifica se o nome para avisar está na lista dos nomes em geral

                    if (avisar.sms == true) { // Verifica se é para enviar SMS
                        console.log("enviando mensagem SMS...")
                        enviaSMS( // Chama função e envia parâmetros
                            Variavel[0],
                            Variavel[1].mensagem,
                            resp.nome,
                            resp.telefone
                        );
                    };
                    if (avisar.telefone == true) { // Verifica se é para enviar mensagem telefone
                        console.log("enviando mensagem de audio...")
                        enviaTelefone( // Chama função e envia parâmetros
                            Variavel[0],
                            Variavel[1].mensagem,
                            resp.nome,
                            resp.telefone
                        );
                    };
                    if (avisar.email == true) {
                        console.log("enviando mensagem de e-mail...")
                        enviaEmail( // Chama função e envia e-mail
                            Variavel[0],
                            Variavel[1].mensagem,
                            resp.nome,
                            resp.email
                        );
                    };
                };
            };

        };
    } catch (err) {
        let msgErro = "FALHA AO ATUALIZAR VARIÁVEL " + Variavel + " - erro: " + err
        bd.insertBD("log", msgErro)
        console.log(msgErro)
    }
};
module.exports.monitorIO = monitorIO




// **************************************************************
// Calculo do uso dos queimadores

// GRAVA CARGA DOS QUEIMADORES DA PINTURA PÓ
var cargaQueimadoresPP = [];
setInterval(mediaQueimadoresPP, 1000);

function mediaQueimadoresPP() {
    cargaQueimadoresPP.push(
        (
            (Variaveis.Queim1PPchmBx.valor ? 1 : 0) * 12.5 +

            (Variaveis.Queim1PPchmAt.valor ? 1 : 0) * 12.5 +

            (Variaveis.Queim2PPchmBx.valor ? 1 : 0) * 12.5 +

            (Variaveis.Queim2PPchmAt.valor ? 1 : 0) * 12.5 +

            (Variaveis.Queim3PPchmBx.valor ? 1 : 0) * 12.5 +

            (Variaveis.Queim3PPchmAt.valor ? 1 : 0) * 12.5 +

            (Variaveis.Queim4PPchmBx.valor ? 1 : 0) * 12.5 +

            (Variaveis.Queim4PPchmAt.valor ? 1 : 0) * 12.5

        )

    )
}



setInterval(consQueimadoresPP, 60000);

function consQueimadoresPP() {
    //console.log("INICIANDO GRAVAÇÃO NO BD DOS VALORES DE CARGA DOS QUEIMADORES DA PP")
    try {
        insertQueimPP().then(
            function (val) {
                //console.log("valor inserido no BD: ", val);
                cargaQueimadoresPP = [];
            }
        )
    } catch (err) {
        let msgErro = "Erro ao tentar acessar função insertQueimPP - Erro: " + err
        bd.insertBD("log", msgErro)
        console.log(msgErro)

    }
};


function insertQueimPP() {
    return new Promise(
        function (resolve, reject) {
            try {
                resolve(
                    bd.insertBD(
                        "QueimadoresPP",
                        cargaQueimadoresPP.reduce((acumulador, atual) => acumulador + atual) / (cargaQueimadoresPP.length)
                    )
                )
            } catch (err) {
                let msgErro = "falha ao inserir novo valor de carga da PP no BD - Erro: " + err
                bd.insertBD("log", msgErro)
                console.log(msgErro)
                reject(msgErro);
            }
        });
}





// GRAVA CARGA DOS QUEIMADORES DA PINTURA LÍQUIDA
var cargaQueimadoresPL = [];
setInterval(mediaQueimadoresPL, 1000);

function mediaQueimadoresPL() {
    cargaQueimadoresPL.push(
        (
            (Variaveis.Queim1PLchmBx.valor ? 1 : 0) * 25 +

            (Variaveis.Queim1PLchmAt.valor ? 1 : 0) * 25 +

            (Variaveis.Queim2PLchmBx.valor ? 1 : 0) * 25 +

            (Variaveis.Queim2PLchmAt.valor ? 1 : 0) * 25

        )

    )

    //console.log("CARGA ACUMULADA DOS QUEIMADORES PL: ", cargaQueimadoresPL)
}



setInterval(consQueimadoresPL, 60000);

function consQueimadoresPL() {
    //console.log("INICIANDO GRAVAÇÃO NO BD DOS VALORES DE CARGA DOS QUEIMADORES DA PL")
    try {
        insertQueimPL().then(
            function (val) {
                //console.log("valor inserido no BD: ", val);
                cargaQueimadoresPL = [];
            }
        )
    } catch (err) {
        let msgErro = "falha ao inserir novo valor de carga da PL no BD - Erro: " + err
        bd.insertBD("log", msgErro)
        console.log(msgErro)
        reject(msgErro);
    }
};


function insertQueimPL() {
    return new Promise(
        function (resolve, reject) {
            try {
                resolve(
                    bd.insertBD(
                        "QueimadoresPL",
                        cargaQueimadoresPL.reduce((acumulador, atual) => acumulador + atual) / (cargaQueimadoresPL.length)
                    )
                )
            } catch (err) {
                let msgErro = "falha ao inserir novo valor de carga da PL no BD - Erro: " + err
                bd.insertBD("log", msgErro)
                console.log(msgErro)
                reject(msgErro);
            }
        });
}