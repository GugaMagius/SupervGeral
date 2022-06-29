const axios = require("axios");
const TotalVoice = require("totalvoice-node");
const client = new TotalVoice('bdbd5d9bbfde6b02f50af4a79c8b09f2');
const options = {
    velocidade: 2,
    tipo_voz: 'br-Ricardo'
};


let enviaTelefone = async function (processo, mensagem, responsavel, telefone) {

    try {
        console.log("Falha no processo: " + processo + " com a mensagem: " + mensagem + " Enviada para: " +
            responsavel + " pelo telefone: " + telefone);

        //const mensagem = `${processo}, ${mensagem}`
        //const newoptions = JSON.stringify(options, null, 4)
        //console.log(options)

        await client.tts.enviar(telefone, "Atenção " + responsavel + "! " + mensagem, options)
            .then(() => {
                console.log(`O ${responsavel} já foi avisado`)
            })
            .catch((err) => {
                let msgErro = "Erro de conexão com o telefone: " + telefone + JSON.stringify(err, null, 4)
                console.log(msgErro)

                console.log(msgErro);

                enviaEmail( // Chama função e envia e-mail
                    "Falha de Total Voice", // Assunto do e-mail
                    msgErro,
                    config.administrador.nome,
                    config.administrador.email
                );

            });
    } catch (err) {
        console.log("FALHA AO ENVIAR ALERTA POR TELEFONE: ", err)
    }
}


//}

module.exports = enviaTelefone;