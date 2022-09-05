


const main = require('./main') // Arquivo principal

const io = require('./api/socket/server') //client SOCKET

const bd = require('./api/BD/server')



function instModlEcoat () {
    const plcEcoat = require('./api/comunicacao/Ecoat/server')
}
module.exports.instModlEcoat = instModlEcoat



function instModlPP () {

    const plcPinturaPo = require('./api/comunicacao/PinturaPo/server')
}
module.exports.instModlPP = instModlPP


function instModlAuditorio () {

    const modlAuditorio = require('./api/comunicacao/Modbus/server')
}
module.exports.instModlAuditorio = instModlAuditorio

