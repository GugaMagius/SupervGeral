
const nodemailer = require('nodemailer');

try {


    let transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'alerta@magius.com.br',
            pass: 'Magius1@'
        }
    });

    var enviaEmail = function (assunto, mensagem, responsavel, email) {

        console.log("Enviando e-mail para: " + responsavel + " - assunto: " + assunto + " - mensagem: " + mensagem)

        const mailOptions = {
            from: '"Alerta" <alerta@magius.com.br>', // sender address
            to: email,
            subject: assunto,
            text: "Atenção " + responsavel + "! " + mensagem
        };

        /* #Teste
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });
        */

    }

} catch (err) {
    console.log("FALHA AO ENVIAR E-MAIL: ", err)
}

module.exports = enviaEmail;
