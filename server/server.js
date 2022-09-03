
const main = require('./main') // Arquivo principal

const io = require('./api/socket/server') //client SOCKET

const bd = require('./api/BD/server')

const plcEcoat = require('./api/comunicacao/Ecoat/server')


const plcPinturaPo = require('./api/comunicacao/PinturaPo/server')

const modbus = require('./api/comunicacao/Modbus/server')

/*
main


io


bd


//plc

modbus
*/
