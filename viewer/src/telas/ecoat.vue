
<template>
  <div class="flexgrid-demo p-p-2">
    <div class="p-grid">
      <!-- TEMPERATURA DOS TANQUES -->
      <div class="p-col-3">
        <div class="p-grid">
          <!-- Ácido 1 -->
          <div class="p-col-12">
            <Knob v-bind:modelValue="Variaveis.tmp_Acido1.valor" :size="50" readonly="true" strokeWidth="12"
              v-bind:valueColor="Variaveis.tmp_Acido1.cor" />
          </div>
          <div class="p-col-12 SubTitulo" v-bind:class="{ Falha: Variaveis.falha_Acido1.valor }">
            Temperatura do Ácido 1 <br />
            de {{ Variaveis.SP_Acido1.valor - Variaveis.Hfunc_Acido1.valor }} a {{ Variaveis.SP_Acido1.valor +
                Variaveis.Hfunc_Acido1.valor
            }}ºC
          </div>

          <!-- Ácido 2 -->
          <div class="p-col-12">
            <Knob v-bind:modelValue="Variaveis.tmp_Acido2.valor" :size="50" readonly="true" strokeWidth="12"
              v-bind:valueColor="Variaveis.tmp_Acido2.cor" />
          </div>
          <div class="p-col-12 SubTitulo" v-bind:class="{ Falha: Variaveis.falha_Acido2.valor }">
            Temperatura do Ácido 2 <br />
            de {{ Variaveis.SP_Acido2.valor - Variaveis.Hfunc_Acido2.valor }} a {{ Variaveis.SP_Acido2.valor +
                Variaveis.Hfunc_Acido2.valor
            }}ºC
          </div>

          <!-- Desengraxante 1 -->
          <div class="p-col-12">
            <Knob v-bind:modelValue="Variaveis.tmp_Deseng1.valor" :size="50" readonly="true" strokeWidth="12"
              v-bind:valueColor="Variaveis.tmp_Deseng1.cor" />
          </div>
          <div class="p-col-12 SubTitulo" v-bind:class="{ Falha: Variaveis.falha_Desg1.valor }">
            Temperatura do Deseng 1 <br />
            de {{ Variaveis.SP_Deseng1.valor - Variaveis.Hfunc_Deseng1.valor }} a {{ Variaveis.SP_Deseng1.valor +
                Variaveis.Hfunc_Deseng1.valor
            }}ºC
          </div>

          <!-- Desengraxante 2 -->
          <div class="p-col-12">
            <Knob v-bind:modelValue="Variaveis.tmp_Deseng2.valor" id="Deseng2" :size="50" readonly="true"
              strokeWidth="12" v-bind:valueColor="Variaveis.tmp_Deseng2.cor" />
            <div class="p-col-12 SubTitulo" v-bind:class="{ Falha: Variaveis.falha_Desg2.valor }">
              Temperatura do Deseng 2 <br />
              de {{ Variaveis.SP_Deseng2.valor - Variaveis.Hfunc_Deseng2.valor }} a {{ Variaveis.SP_Deseng2.valor +
                  Variaveis.Hfunc_Deseng2.valor
              }}ºC
            </div>

            <!-- Fosfato -->
            <div class="p-col-12">
              <Knob v-bind:modelValue="Variaveis.tmp_Fosfato.valor" :size="50" readonly="true" strokeWidth="12"
                v-bind:valueColor="Variaveis.tmp_Fosfato.cor" />
              <div class="p-col-12 SubTitulo" v-bind:class="{ Falha: Variaveis.falha_Fosf.valor }">
                Temperatura do Fosfato <br />
                de {{ Variaveis.SP_Fosfato.valor - Variaveis.Hfunc_Fosfato.valor }} a {{ Variaveis.SP_Fosfato.valor +
                    Variaveis.Hfunc_Fosfato.valor
                }}ºC
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- TEMPERATURA DA TINTA (KTL) -->
      <div class="p-col-3 box-stretched">
        <Knob v-bind:modelValue="Variaveis.tmp_KTL.valor" v-bind:size="tamanho1" readonly="true" strokeWidth="18"
          v-bind:valueColor="Variaveis.tmp_KTL.cor" />
      </div>
      <!-- TEMPERATURA DA CALDEIRA -->
      <div class="p-col-3 box-stretched">
        <Knob v-bind:modelValue="Variaveis.tmp_Cald.valor" v-bind:size="tamanho1" :min="0" :max="140" readonly="true"
          strokeWidth="18" v-bind:valueColor="Variaveis.tmp_Cald.cor" />
      </div>
      <!-- TEMPERATURA DA ESTUFA -->
      <div class="p-col-3">
        <div class="p-grid">
          <!-- Entrada Estufa -->
          <div class="p-col-12">
            <Knob v-bind:modelValue="Variaveis.temperEntEstEcoat.valor" :size="150" :max="260" readonly="true"
              strokeWidth="12" v-bind:valueColor="Variaveis.temperEntEstEcoat.cor" />
          </div>
          <div class="p-col-12 SubTitulo" v-bind:class="{ Falha: Variaveis.falha_TmpEntEst.valor }">
            Temperatura da Entrada da Estufa <br />
                de {{ Variaveis.SP_EntEstfEcoat.valor - Variaveis.Hfunc_EntEstfEcoat.valor }} a {{ Variaveis.SP_EntEstfEcoat.valor +
                    Variaveis.Hfunc_EntEstfEcoat.valor
                }}ºC
          </div>
          <!-- Saída Estufa -->
          <div class="p-col-12">
            <Knob v-bind:modelValue="Variaveis.temperSaiEstEcoat.valor" :size="150" :max="260" readonly="true"
              strokeWidth="12" v-bind:valueColor="Variaveis.temperSaiEstEcoat.cor" />
          </div>
          <div class="p-col-12 SubTitulo" v-bind:class="{ Falha: Variaveis.falha_TmpSaiEst.valor }">
            Temperatura da Saída da Estufa<br />
                de {{ Variaveis.SP_SaiEstfEcoat.valor - Variaveis.Hfunc_SaiEstfEcoat.valor }} a {{ Variaveis.SP_SaiEstfEcoat.valor +
                    Variaveis.Hfunc_SaiEstfEcoat.valor
                }}ºC
          </div>
        </div>
      </div>
      <!-- TÍTULOS - LINHA INFERIOR -->
      <div class="p-col-3 SubTitulo1">Temperaturas dos Tanques</div>
      <div class="p-col-3 SubTitulo1" v-bind:class="{ Falha: Variaveis.falha_tmp_KTL.valor }">
        Temperatura da Tinta <br />
                de {{ Variaveis.SP_KTL.valor - Variaveis.Hfunc_KTL.valor }} a {{ Variaveis.SP_KTL.valor +
                    Variaveis.Hfunc_KTL.valor
                }}ºC
      </div>
      <div class="p-col-3 SubTitulo1" v-bind:class="{ Falha: Variaveis.falha_Cald.valor }">
        Temperatura da Caldeira <br />
                de {{ Variaveis.SP_Cald.valor - Variaveis.Hfunc_Cald.valor }} a {{ Variaveis.SP_Cald.valor +
                    Variaveis.Hfunc_Cald.valor
                }}ºC
      </div>
      <div class="p-col-3 SubTitulo1">Temperaturas da Estufa</div>
    </div>
  </div>

</template>

<script>
export default {
  name: "ecoat",
  components: {},

  data() {
    return {
      tamanho1: 240,
    };
  },
  props: {
    Variaveis: Object
    /*
    temperEntEstEcoat: Number,
    corTmp_EntEst: String,
    temperSaiEstEcoat: Number,
    corTmp_SaiEst: String,
    tmp_KTL: Number,
    corTmp_KTL: String,
    tmp_Cald: Number,
    corTmp_Cald: String,
    tmp_Acido1: Number,
    corTmp_Acido1: String,
    tmp_Acido2: Number,
    corTmp_Acido2: String,
    tmp_Deseng1: Number,
    corTmp_Deseng1: String,
    tmp_Deseng2: Number,
    corTmp_Deseng2: String,
    tmp_Fosfato: Number,
    corTmp_Fosfato: String,
    falha_tmp_KTL: Boolean,
    falha_Critica: Boolean,
    falha_Acido1: Boolean,
    falha_Acido2: Boolean,
    falha_Desg1: Boolean,
    falha_Desg2: Boolean,
    falha_Fosf: Boolean,
    falha_Cald: Boolean,
    */
  },
};
</script>

<style scoped>
/*
.p-knob-value.path {
  stroke: blue;
}
*/

.flexgrid-demo {
  margin-top: 25px;

}

.box-stretched {
  height: 100%;
}

.Temperatura {
  height: 70vh;
}

.red {
  stroke: red;
}

.SubTitulo1 {
  font-size: 2.2vh;
}

.SubTitulo {
  font-size: 1.8vh;
  margin-top: -1vh;
  padding-top: 0px;
  margin-bottom: 0vh;
}

.Principal {
  height: 100%;
  width: 100%;
}

#Fdo {
  position: relative;
  height: 70vh;
  width: 30vh;
  margin: auto;
  background-color: var(--surface-a);
}

#Bar {
  position: relative;
  background-color: lightgreen;
  padding-top: 0px;
}

.Falha {
  background-color: red;
  animation: blinker 0.5s linear infinite;
}

@keyframes blinker {
  40% {
    opacity: 0;
  }
}

.Sinotico {
  height: auto;
  max-height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
  margin-top: 0;
  padding-top: 0px;
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
  padding-top: 0px;
}
</style>


