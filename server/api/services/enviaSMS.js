const axios = require("axios");
const TotalVoice = require("totalvoice-node");
const token = 'bdbd5d9bbfde6b02f50af4a79c8b09f2'


let enviaSMS = async function (processo, mensagem, responsavel, telefone) {

    try {
        console.log("Falha no processo: " + processo + " com a mensagem: " + mensagem + " Enviada para: " +
            responsavel + " pelo SMS ao telefone: " + telefone);


        const sms = await axios({

            url: 'https://api2.totalvoice.com.br/sms',
            method: 'post',
            headers: {
                'Access-Token': token
            },
            data: {
                'numero_destino': telefone,
                'mensagem': "Atenção " + responsavel + ", " + mensagem
            }
        });

    } catch (err) {
        console.log("FALHA AO ENVIAR SMS: ", err)
    }

}



module.exports = enviaSMS;