console.log("INICIANDO BD")
var sql = require("mssql");

const config = require('../../configBD').config // Configurações de acesso ao Banco de Dados

function insertBD(tabela, valor, param1, param2) {
    //console.log("valores a serem inseridos na tabela: ", tabela, "Valor: ", valor, "Parametro1: ", param1, "Parametro2: ", param2)
    // connect to your database
    //return //#Teste

    try {

        // connect to your database
        sql.connect(config, function (err) {

            if (err) console.log(err);

            // create Request object
            var request = new sql.Request();

            // query to the database and get the records

            request.query(`select object_id('${tabela}')`, function (err, recordset) {
                //request.query("insert into dbo.Cad_func values('Ricardo', 'Analista') ", function (err, recordset) {
                if (err) {
                    console.log("Falha na string de consulta" + err);
                    return
                }


                let data_atual = new Date();
                let ano = data_atual.getFullYear().toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
                let mes = (data_atual.getMonth() + 1).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
                let dia = data_atual.getDate().toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
                let hora = data_atual.getHours().toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
                let mint = data_atual.getMinutes().toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
                let secn = data_atual.getSeconds().toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });

                let data_conv = `${ano}-${mes}-${dia} ${hora}:${mint}:${secn}`;

                //console.log("Data atual: ", data_atual);
                //console.log("Data convertida: ", data_conv);
                //console.log("Tabela: ", tabela);
                //console.log("Valor: ", valor);


                const resp = recordset.recordsets[0][0]

                function criarTabela() {

                    return new Promise(
                        function (resolve, reject) {
                            try {
                                request.query(`CREATE TABLE ${tabela}(id int primary key IDENTITY(1,1), data smalldatetime, valor numeric (16,2))`, function (err, recordset) {
                                    if (err) {
                                        console.log("Falha ao criar a tabela: " + err)
                                        reject(false)
                                        return
                                    } else {
                                        console.log("Criado a tabela com sucesso! " + JSON.stringify(recordset))
                                        resolve(true)
                                    }
                                })
                            } catch (err) {
                                console.log("falha ao cadastrar a tabela: " + err)
                            }
                        }
                    )

                }

                function inserirValor() {
                    let stringLog = `INSERT INTO ${tabela} VALUES('${data_conv}','${valor}') `
                    //console.log("INSERINDO VALOR NA TABELA - STRING: ", stringLog)

                    try {
                        request.query(stringLog), function (err, recordset) {
                            //console.log("Inserindo valor na tabela! " + JSON.stringify(recordset))
                            if (err) {
                                console.log("Falha ao inserir novo valor: " + err)
                                return
                            }
                        }
                    } catch (err) {
                        console.log("falha ao acessar a tabela para inserir novo valor: " + err)
                    }
                }

                if (resp[""] === null) {
                    criarTabela().then(function (val) {
                        if (val === true) inserirValor();
                    });

                } else {
                    inserirValor();

                }

            });
        });
    } catch (err) {
        let msgErro = 'falha ao conectar ao banco de dados ' + err
        enviaEmail( // Chama função e envia e-mail
            "Erro BD",
            msgErro,
            contatos.administrador.nome,
            contatos.administrador.email
        );
        console.log(msgErro)
    }

}
module.exports.insertBD = insertBD


function selectBD(tabela, filtro, data1, data2, index, qtdVariaveis) {

    return new Promise(
        function (resolve, reject) {
            // connect to your database
            try {
                sql.connect(config, function (err) {

                    if (err) {
                        console.log(err);

                    } else {

                        // create Request object
                        var request = new sql.Request();

                        // query to the database and get the records
                        let query = "select " + filtro + " from " + tabela + " where data between " + data1 + " and " + data2
                        request.query(query, function (err, recordset) {
                            var tQtdVariaveis = qtdVariaveis;
                            var tIndex = index;
                            console.log("QUERY DA CONSULTA AO BANCO DE DADOS: ", query)
                            if (err) console.log(err)

                            // send records as a response
                            //console.log(recordset);
                            resolve(recordset, tIndex, tQtdVariaveis)

                        });
                    }
                });
            } catch (err) {
                console.log("Erro ao consultar BD ", err)
            }
        })
}
module.exports.selectBD = selectBD




function limpaBD(tabela, data) {

    return new Promise(
        function (resolve, reject) {
            // connect to your database
            try {
                sql.connect(config, function (err) {

                    if (err) {
                        console.log(err);

                    } else {

                        // create Request object
                        var request = new sql.Request();

                        // query to the database and get the records
                        let query = "delete from " + tabela + " where data < " + data
                        request.query(query, function (err, recordset) {
                            console.log("LIMPEZA DO BANCO DE DADOS REALIZADA: ", query, recordset)
                            if (err) console.log(err)

                            // send records as a response
                            resolve(recordset)

                        });
                    }
                });
            } catch (err) {
                console.log("Erro ao consultar BD ", err)
            }
        })
}
module.exports.limpaBD = limpaBD

