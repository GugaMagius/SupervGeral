
const ads = require('ads-client');
const main = require('../../../main')
const storage = require('../../services/storage')
const socketIO = require('../../socket/server')

var flagFalha = false



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

/*
// Configurações do Target do CLP para acesso via ADS (ADS precisa estar instalado no PC)
const clientPLCecoat = new ads.Client({
    targetAmsNetId: '5.42.86.72.1.1', //'5.42.86.72.1.1', // Ecoat, '5.88.201.147.1.1', // Pintura pó
    targetAdsPort: 851,
    autoReconnect: false
});
module.exports.clientPLCecoat = clientPLCecoat
*/

///* #Teste!

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


//*/

function falhaConexao(msg) {

    socketIO.statusConnect.ecoat = false
    console.log(msg)
    flagFalha === false ? storage.setLS("log", msg) : flagFalha
    flagFalha = true;

}


iVerifPLC = setInterval(verificaPLC, 2000);

async function verificaPLC() {

    try {

        let respStatus = await clientPLCecoat.readPlcRuntimeState();

        if (respStatus.adsState !== 5) {

            let msgErro = 'CLP do E-coat desconectado: ' + respStatus
            falhaConexao(msgErro)
            clientPLCecoat.disconnect();

        } else {

            console.log("CLP do ECOAT conectado: ", respStatus)
            socketIO.statusConnect.ecoat = true

        }

    } catch (err) {

        let msgErro = 'Falha ao tentar conectar ao PLC do E-coat: ' + err
        falhaConexao(msgErro)

        conectar();

    }

}

function conectar() {

    try {

        /* Provisorio
        clientPLCecoat.unsubscribeAll().catch(function (err) {
            let msgErro = "Falha ao apagar subscrição de variáveis no CLP do E-coat: " + err
            console.log(msgErro)
        })
        */


        clientPLCecoat.connect()
            .then((resp) => {

                socketIO.statusConnect.ecoat = true;

                //clearInterval(iTentativaRec)
                // Inicia instância para monitorar as variáveis do processo e atualizar os valores 
                console.log("CONEXÃO COM O CLP DO E-COAT REALIZADA COM SUCESSO!!! ", resp)

                // LEITURA DAS VARIAVEIS DO CLP (CRIAR SUBSCRIÇÃO DAS VARIÁVEIS)
                // Varre variáveis para aquisção com o CLP

                main.listaAtualizada().then(
                    function (val) {
                        var Variaveis = val
                        //console.log("INICIANDO FOR PARA VARIAVEIS DO CLP: "+JSON.stringify(Variaveis))
                        for (const Variavel of Object.entries(Variaveis)) {

                            if (Variavel[1].modulo === "PLCecoat") {

                                clientPLCecoat.subscribe(Variavel[1].endereco, (data, sub) => {
                                    //Note: The sub parameter is the same as returned by clientPLCecoat.subcribe()
                                    try {
                                        main.tratDados(Variavel, data.value);
                                    } catch (err) {
                                        main.tratDados(Variavel, 0)
                                        let msgErro = "FALHA NO TRATAMENTO DA VARIÁVEL DO CLP do Ecoat: " + " - Erro: " + err
                                        falhaConexao(msgErro)
                                    }

                                }, 5000)
                                    .catch(err => {
                                        let msgErro = 'Falha ao ler variável do CLP do Ecoat: ' + Variavel[1].endereco + err
                                        falhaConexao(msgErro)

                                    })

                            }
                        }
                    }
                )

            })


            .catch((err) => {
                let msgErro = 'Falha ao conectar ao CLP do Ecoat' + err
                falhaConexao(msgErro)

            })
    } catch (err) {
        let msgErro = "FALHA AO CONECTAR AO CLP DO E-COAT: " + err
        falhaConexao(msgErro)
    }

}
conectar();


/*
typedef enum nAdsState {
  ADSSTATE_INVALID      = 0,
  ADSSTATE_IDLE         = 1,
  ADSSTATE_RESET        = 2,
  ADSSTATE_INIT         = 3,
  ADSSTATE_START        = 4,
  ADSSTATE_RUN          = 5,
  ADSSTATE_STOP         = 6,
  ADSSTATE_SAVECFG      = 7,
  ADSSTATE_LOADCFG      = 8,
  ADSSTATE_POWERFAILURE = 9,
  ADSSTATE_POWERGOOD    = 10,
  ADSSTATE_ERROR        = 11,
  ADSSTATE_SHUTDOWN     = 12,
  ADSSTATE_SUSPEND      = 13,
  ADSSTATE_RESUME       = 14,
  ADSSTATE_CONFIG       = 15,   // system is in config mode
  ADSSTATE_RECONFIG     = 16,   // system should restart in config mode
  ADSSTATE_MAXSTATES
} ADSSTATE;
*/