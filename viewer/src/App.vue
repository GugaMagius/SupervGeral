<template>
  <div class="Principal">
    <div class="Titulo">
      <div class="logo">
        <img
          src="../public/logoMagius.png"
          style="width: auto; height: auto; max-width: 300px; max-height: 300px"
        />
      </div>

      <h2>Sistema Supervisório Magius {{ $route.name }} &nbsp;</h2>
      <div>{{ isConnected ? "" : " *** Servidor Desconectado ***" }}</div>

      <div class="botaoinicio">
        <Button
          type="button"
          icon="pi pi-bars"
          @click="toggle"
          aria-haspopup="true"
          aria-controls="overlay_menu"
        />
        <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
      </div>
    </div>
    <div class="RouterView" v-if="dadosRecebidos">
      <router-view
        :recEstufaPP="Variaveis.recEstufaPP.valor"
        :aFilaPP="Variaveis.aFilaPP.valor"
        :aPosRecPP="Variaveis.aPosRecPP.valor"
        :recEstufaPL="Variaveis.recEstufaPL.valor"
        :aFilaPL="Variaveis.aFilaPL.valor"
        :aPosRecPL="Variaveis.aPosRecPL.valor"
        :velMonoviaPL="Variaveis.velMonoviaPL.valor"
        :velMonoviaPP="Variaveis.velMonoviaPP.valor"
        :stsMonoviaPL="Variaveis.stsMonoviaPL.valor"
        :stsMonoviaPP="Variaveis.stsMonoviaPP.valor"
        :stsVelMonovPP="Variaveis.stsVelMonovPP.valor"
        :temperQueim1PP="Variaveis.temperQueim1PP.valor"
        :temperQueim2PP="Variaveis.temperQueim2PP.valor"
        :temperQueim3PP="Variaveis.temperQueim3PP.valor"
        :temperQueim4PP="Variaveis.temperQueim4PP.valor"
        :temperQueim1PL="Variaveis.temperQueim1PL.valor"
        :temperQueim2PL="Variaveis.temperQueim2PL.valor"
        :spQueim1PP="Variaveis.spQueim1PP.valor"
        :spQueim2PP="Variaveis.spQueim2PP.valor"
        :spQueim3PP="Variaveis.spQueim3PP.valor"
        :spQueim4PP="Variaveis.spQueim4PP.valor"
        :spQueim1PL="Variaveis.spQueim1PL.valor"
        :spQueim2PL="Variaveis.spQueim2PL.valor"
        :leitVent1PL="Variaveis.leitVent1PL.valor"
        :leitVent2PL="Variaveis.leitVent2PL.valor"
        :leitVent1PP="Variaveis.leitVent1PP.valor"
        :leitVent2PP="Variaveis.leitVent2PP.valor"
        :leitVent3PP="Variaveis.leitVent3PP.valor"
        :leitVent4PP="Variaveis.leitVent4PP.valor"
        :leitQuem1PL="Variaveis.leitQuem1PL.valor"
        :leitQuem2PL="Variaveis.leitQuem2PL.valor"
        :leitQuem1PP="Variaveis.leitQuem1PP.valor"
        :leitQuem2PP="Variaveis.leitQuem2PP.valor"
        :leitQuem3PP="Variaveis.leitQuem3PP.valor"
        :leitQuem4PP="Variaveis.leitQuem4PP.valor"
        :falhaQuem1PL="Variaveis.falhaQuem1PL.valor"
        :falhaQuem2PL="Variaveis.falhaQuem2PL.valor"
        :falhaQuem1PP="Variaveis.falhaQuem1PP.valor"
        :falhaQuem2PP="Variaveis.falhaQuem2PP.valor"
        :falhaQuem3PP="Variaveis.falhaQuem3PP.valor"
        :falhaQuem4PP="Variaveis.falhaQuem4PP.valor"
        :falhaVent1PL="Variaveis.falhaVent1PL.valor"
        :falhaVent2PL="Variaveis.falhaVent2PL.valor"
        :falhaVent1PP="Variaveis.falhaVent1PP.valor"
        :falhaVent2PP="Variaveis.falhaVent2PP.valor"
        :falhaVent3PP="Variaveis.falhaVent3PP.valor"
        :falhaVent4PP="Variaveis.falhaVent4PP.valor"
        :leitCortArPP="Variaveis.leitCortArPP.valor"
        :leitCortArPL="Variaveis.leitCortArPL.valor"
        :falhaTemp1PP="Variaveis.falhaTemp1PP.valor"
        :falhaTemp2PP="Variaveis.falhaTemp2PP.valor"
        :falhaTemp3PP="Variaveis.falhaTemp3PP.valor"
        :falhaTemp4PP="Variaveis.falhaTemp4PP.valor"
        :falhaTemp1PL="Variaveis.falhaTemp1PL.valor"
        :falhaTemp2PL="Variaveis.falhaTemp2PL.valor"
        :Queim1PPchmBx="Variaveis.Queim1PPchmBx.valor"
        :Queim1PPchmAt="Variaveis.Queim1PPchmAt.valor"
        :Queim2PPchmBx="Variaveis.Queim2PPchmBx.valor"
        :Queim2PPchmAt="Variaveis.Queim2PPchmAt.valor"
        :Queim3PPchmBx="Variaveis.Queim3PPchmBx.valor"
        :Queim3PPchmAt="Variaveis.Queim3PPchmAt.valor"
        :Queim4PPchmBx="Variaveis.Queim4PPchmBx.valor"
        :Queim4PPchmAt="Variaveis.Queim4PPchmAt.valor"
        :Queim1PLchmBx="Variaveis.Queim1PLchmBx.valor"
        :Queim1PLchmAt="Variaveis.Queim1PLchmAt.valor"
        :Queim2PLchmBx="Variaveis.Queim2PLchmBx.valor"
        :Queim2PLchmAt="Variaveis.Queim2PLchmAt.valor"
        :min1_Agua="Variaveis.min1_Agua.valor"
        :min2_Agua="Variaveis.min2_Agua.valor"
        :nivel_Agua="Variaveis.nivel_Agua.valor"
        :corNv_Agua="Variaveis.nivel_Agua.cor"
        :min1_Ag_Ref="Variaveis.min1_Ag_Ref.valor"
        :min2_Ag_Ref="Variaveis.min2_Ag_Ref.valor"
        :nivel_Ag_Ref="Variaveis.nivel_Ag_Ref.valor"
        :corNv_Ag_Ref="Variaveis.nivel_Ag_Ref.cor"
        :temperEntEstEcoat="Variaveis.temperEntEstEcoat.valor"
        :corTmp_EntEst="Variaveis.temperEntEstEcoat.cor"
        :temperSaiEstEcoat="Variaveis.temperSaiEstEcoat.valor"
        :corTmp_SaiEst="Variaveis.temperSaiEstEcoat.cor"
        :SP_KTL="Variaveis.SP_KTL.valor"
        :Hfunc_KTL="Variaveis.Hfunc_KTL.valor"
        :Hfalha_KTL="Variaveis.Hfalha_KTL.valor"
        :tmp_KTL="Variaveis.tmp_KTL.valor"
        :corTmp_KTL="Variaveis.tmp_KTL.cor"
        :SP_Cald="Variaveis.SP_Cald.valor"
        :Hfunc_Cald="Variaveis.Hfunc_Cald.valor"
        :Hfalha_Cald="Variaveis.Hfalha_Cald.valor"
        :tmp_Cald="Variaveis.tmp_Cald.valor"
        :corTmp_Cald="Variaveis.tmp_Cald.cor"
        :vazaoArComp="Variaveis.vazaoArComp.valor"
        :corVazArComp="Variaveis.vazaoArComp.cor"
        :SP_Acido1="Variaveis.SP_Acido1.valor"
        :Hfunc_Acido1="Variaveis.Hfunc_Acido1.valor"
        :Hfalha_Acido1="Variaveis.Hfalha_Acido1.valor"
        :tmp_Acido1="Variaveis.tmp_Acido1.valor"
        :corTmp_Acido1="Variaveis.tmp_Acido1.cor"
        :SP_Acido2="Variaveis.SP_Acido2.valor"
        :Hfunc_Acido2="Variaveis.Hfunc_Acido2.valor"
        :Hfalha_Acido2="Variaveis.Hfalha_Acido2.valor"
        :tmp_Acido2="Variaveis.tmp_Acido2.valor"
        :corTmp_Acido2="Variaveis.tmp_Acido2.cor"
        :SP_Deseng1="Variaveis.SP_Deseng1.valor"
        :Hfunc_Deseng1="Variaveis.Hfunc_Deseng1.valor"
        :Hfalha_Deseng1="Variaveis.Hfalha_Deseng1.valor"
        :tmp_Deseng1="Variaveis.tmp_Deseng1.valor"
        :corTmp_Deseng1="Variaveis.tmp_Deseng1.cor"
        :SP_Deseng2="Variaveis.SP_Deseng2.valor"
        :Hfunc_Deseng2="Variaveis.Hfunc_Deseng2.valor"
        :Hfalha_Deseng2="Variaveis.Hfalha_Deseng2.valor"
        :tmp_Deseng2="Variaveis.tmp_Deseng2.valor"
        :corTmp_Deseng2="Variaveis.tmp_Deseng2.cor"
        :SP_Fosfato="Variaveis.SP_Fosfato.valor"
        :Hfunc_Fosfato="Variaveis.Hfunc_Fosfato.valor"
        :Hfalha_Fosfato="Variaveis.Hfalha_Fosfato.valor"
        :tmp_Fosfato="Variaveis.tmp_Fosfato.valor"
        :corTmp_Fosfato="Variaveis.tmp_Fosfato.cor"
        :falha_nivel_Agua="Variaveis.falha_nivel_Agua.valor"
        :falha_tmp_KTL="Variaveis.falha_tmp_KTL.valor"
        :falha_Critica="Variaveis.falha_Critica.valor"
        :falha_Acido1="Variaveis.falha_Acido1.valor"
        :falha_Acido2="Variaveis.falha_Acido2.valor"
        :falha_Desg1="Variaveis.falha_Desg1.valor"
        :falha_Desg2="Variaveis.falha_Desg2.valor"
        :falha_Fosf="Variaveis.falha_Fosf.valor"
        :falha_Cald="Variaveis.falha_Cald.valor"
      />
    </div>

    <div class="Rodape">
      <div v-for="item in Falhas" :key="item">{{ item }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "App",
  mounted: function () {
    this.alturaTela = window.innerHeight;
  },

  data() {
    return {
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
      Variaveis: {}
    };
  },

  setup() {
    const menu = ref();

    const items = ref([
      {
        label: "Mosaico",
        to: "/mosaico",
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
        this.$router.push("Erro");
      } else {
        this.$router.push(this.rotaAnt);
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

    watchdog() {
      console.log("MENSAGEM DO WATCHDOG", this.varWD);
      this.isConnected = true;
      clearTimeout(this.varWD);
      //this.varWD = setInterval(this.FalhaConexao, this.tmpWD);
    },

    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      this.socketMessage = data;
    },

    // Atualiza pacote de variáveis do PLC
    inicializaVar(data) {
      this.Variaveis = data;
      if (data !== undefined) {
        this.dadosRecebidos=true;
      }
    },

    falhas(data) {
      this.Falhas = data;
    },

    atualiza(data) {
      const Variavel = data[0];
      const Valor = data[1];
      /*
      if (this.Variaveis[Variavel]["casasDec"] !== null) {
        this.Variaveis[Variavel]["valor"] = Valor.toFixed(
          this.Variaveis[Variavel]["casasDec"]
        );
      } else {
        */
      this.Variaveis[Variavel]["valor"] = Valor;
      //}

      // atualiza status da cor
      if (this.Variaveis[Variavel]["cor"] != undefined) {
        this.Variaveis[Variavel]["cor"] = data[2];
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
/*
.p-knob-value.path {
  stroke: blue;
}
*/
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


