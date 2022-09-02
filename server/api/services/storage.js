if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('C:/Apps/supervisorio/scratch');
  }
  const moment = require('moment')
  
  
  var valorAtual
  
  function setLS(key, value) {
    if (key === "log") {
      //console.log("FALHA: ", value);
  
      getLS(key).then(res=>{

        valorAtual = res

      });
      
      let registroAtual = { DataHora: moment.utc().format("DD/MM/AAAA HH:mm:ss"), Mensagem: value };
  
      function verifLogAtual() {
  
        if (valorAtual === undefined || valorAtual === null) {
  
          valorAtual = [];
          valorAtual.push(registroAtual);
  
        } else if (valorAtual.length >= 1000) {
  
          valorAtual.shift();
          valorAtual.push(registroAtual);
  
        } else {
  
          valorAtual.push(registroAtual);
  
        }
  
      }
  
      Promise.resolve(verifLogAtual()).then(
        localStorage.setItem(key, JSON.stringify(valorAtual))
      )
  
    } else {
  
      localStorage.setItem(key, JSON.stringify(value));
  
    }
  }
  module.exports.setLS = setLS

  
  function getLS(key) {

    return new Promise(
      function(resolve, reject) {
        try {
          resolve(JSON.parse(localStorage.getItem(key)))

        } catch(err) {
          reject(err)
        }
      }
    )
  }
  
  module.exports.getLS = getLS