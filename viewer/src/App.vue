<template>
  <div class="Principal">
    <div class="Titulo">
      <div class="logo">
        <img src="../public/logoMagius.png" style="width: auto; height: auto; max-width: 300px; max-height: 300px" />
      </div>

      <h2>Sistema Supervisório Magius {{ $route.name }} &nbsp;</h2>
      <div>{{ isConnected ? "" : " *** Servidor Desconectado ***" }}</div>

      <div class="botaoinicio">
        <Button type="button" icon="pi pi-bars" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
        <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
      </div>
    </div>
    <div class="RouterView" v-if="dadosRecebidos">
      <router-view :Variaveis="Variaveis" :StatusConnect="statusConnect" :Contatos="contatos"/>
    </div>

    <div class="Rodape">
      <div v-for="item in Falhas" :key="item">{{ item }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import packageJson from '../package.json'

export default {
  name: "App",
  mounted: function () {
    this.alturaTela = window.innerHeight;
    this.versaoViewer = packageJson.version
  },

  data() {
    return {
      versaoViewer: '',
      versaoServer: '',
      dadosRecebidos: false,
      varWD: "",
      tmpWD: 15000,
      isConnected: true,
      rotaAnt: "",
      Falhas: {},
      alturaTela: "",
      msgTela: null,
      Titulo: "",
      socketMessage: null,
      Variaveis: {},
      contatos: {},
      statusConnect: { ecoat: false, pinturapo: false, auditorio: false }
    };
  },

  setup() {
    const menu = ref();

    const items = ref([
      {
        label: "Mosaico",
        to: "/",
      },
      {
        label: "Relatorios",
        items: [
          {
            label: "Graficos",
            to: "/graficos",
          },
          {
            label: "Historicos",
            to: "/historicos",
          },
        ],
      },
      {
        label: "Telas",
        items: [
          {
            label: "Utilidades",
            to: "/utilidades",
          },
          {
            label: "Manutenção",
            to: "/manutencao",
          },
          {
            label: "E-coat",
            to: "/ecoat",
          },
          {
            label: "Pintura Pó",
            to: "/pinturapo",
          },
          {
            label: "Pintura líquida",
            to: "/pinturaliq",
          },
        ],
      },
    ]);

    const toggle = (event) => {
      menu.value.toggle(event);
    };

    return { menu, toggle, items };
  },

  watch: {
    isConnected() {
      if (this.isConnected === false) {
        var rotaAntTmp = this.$router.currentRoute;

        try {
          this.rotaAnt = Object.entries(rotaAntTmp)[0][1]["fullPath"];
        } catch (err) {
          console.log("erro ao acessar navegação atual: ", err);
        }
        this.$router.push("Erro"); //#Teste conexao
      } else {
        this.$router.push(this.rotaAnt); //#Teste conexao
      }
    },
  },

  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
      this.varWD = setTimeout(this.FalhaConexao, this.tmpWD);
    },

    disconnect() {
      this.isConnected = false;
    },

    
    // Resposta com as versões dos servers
    versao(versao) {
      console.log("VersãoMES: ", versao, "Versão Viewer: ", this.versaoViewer)
      this.versaoServer = versao
    },

    watchdog(statusConnect) {
      this.statusConnect = statusConnect;
      console.log("MENSAGEM DO WATCHDOG", this.varWD);
      this.isConnected = true;
      clearTimeout(this.varWD);
      //this.varWD = setInterval(this.FalhaConexao, this.tmpWD);
    },

    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(msg) {
      this.socketMessage = msg;
    },

    // Atualiza pacote de variáveis do PLC
    inicializaVar(data) {
      this.Variaveis = data;
      if (data !== undefined) {
        this.dadosRecebidos = true;
      }
    },


    contatos(contatos) {
      this.contatos = contatos

    },

    falhas(data) {
      this.Falhas = data;
    },

    atualiza(data) {
      const Variavel = data[0];
      const Valor = data[1];
      const Cor = data[2];

      this.Variaveis[Variavel]["valor"] = Valor;

      // atualiza status da cor
      if (this.Variaveis[Variavel]["cor"] != undefined) {
        this.Variaveis[Variavel]["cor"] = Cor;
      }
    },
  },
  methods: {
    FalhaConexao() {
      console.log("FALHA NA CONEXÃO");
      this.isConnected = false;
    },
  },
};
</script>

<style>
.logo {
  position: absolute;
  left: 0;
  z-index: 10;
  margin-top: auto;
  margin-bottom: auto;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 1%;
}

h2 {
  padding: 0;
  margin-top: auto;
  margin-bottom: auto;
}

.RouterView {
  overflow-y: auto;
  height: 85vh;
  z-index: 0;
}

.botaoinicio {
  position: absolute;
  right: 0;
  margin-top: auto;
  margin-bottom: auto;
  padding-right: 1%;
  z-index: 10;
}

.Principal {
  height: 85vh;
  width: 100%;
}

.Rodape {
  height: 8vh;
  background-color: var(--surface-a);
  padding: 10px;
  width: 100%;
  bottom: 0;
  margin-bottom: 0;
  padding-bottom: 0;
}

.Titulo {
  height: 7vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--surface-d);
  padding-top: auto;
  padding-bottom: auto;
  margin-bottom: 0px;
  margin-top: 0px;
  z-index: 10;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
  margin-top: 0;
  padding-top: 0px;
  margin-bottom: 0;
  padding-bottom: 0px;
  height: 100%;
}

.app-container {
  text-align: center;
}

body #app .p-button {
  margin-left: 0.2em;
}

body {
  margin: 0;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--surface-b);
  font-family: var(--font-family);
  font-weight: 400;
  color: var(--text-color);
  margin-top: 0px;
  margin-bottom: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>


