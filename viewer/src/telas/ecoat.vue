
<template>
  <div class="flexgrid-demo p-p-2">
    <div class="p-grid">
            <!-- TEMPERATURA DOS TANQUES -->
      <div class="p-col-3">
        <div class="p-grid">
                <!-- Ácido 1 -->
          <div class="p-col-12">
            <Knob
              v-bind:modelValue="tmp_Acido1"
              :size="50"
              readonly="true"
              strokeWidth="12"
              v-bind:valueColor="corTmp_Acido1"
            />
          </div>
          <div
            class="p-col-12 SubTitulo"
            v-bind:class="{ Falha: falha_Acido1 }"
          >
            Temperatura do Ácido 1 <br />
            de 64 a 71ºC
          </div>

                <!-- Ácido 2 -->
          <div class="p-col-12">
            <Knob
              v-bind:modelValue="tmp_Acido2"
              :size="50"
              readonly="true"
              strokeWidth="12"
              v-bind:valueColor="corTmp_Acido2"
            />
          </div>
          <div
            class="p-col-12 SubTitulo"
            v-bind:class="{ Falha: falha_Acido2 }"
          >
            Temperatura do Ácido 2 <br />
            de 64 a 71ºC
          </div>

                <!-- Desengraxante 1 -->
          <div class="p-col-12">
            <Knob
              v-bind:modelValue="tmp_Deseng1"
              :size="50"
              readonly="true"
              strokeWidth="12"
              v-bind:valueColor="corTmp_Deseng1"
            />
          </div>
          <div class="p-col-12 SubTitulo" v-bind:class="{ Falha: falha_Desg1 }">
            Temperatura do Deseng 1 <br />
            de 72 a 78ºC
          </div>

                <!-- Desengraxante 2 -->
          <div class="p-col-12">
            <Knob
              v-bind:modelValue="tmp_Deseng2"
              id="Deseng2"
              :size="50"
              readonly="true"
              strokeWidth="12"
              v-bind:valueColor="corTmp_Deseng2"
            />
            <div
              class="p-col-12 SubTitulo"
              v-bind:class="{ Falha: falha_Desg2 }"
            >
              Temperatura do Deseng 2 <br />
              de 72 a 78ºC
            </div>

                <!-- Fosfato -->
            <div class="p-col-12">
              <Knob
                v-bind:modelValue="tmp_Fosfato"
                :size="50"
                readonly="true"
                strokeWidth="12"
                v-bind:valueColor="corTmp_Fosfato"
              />
              <div
                class="p-col-12 SubTitulo"
                v-bind:class="{ Falha: falha_Fosf }"
              >
                Temperatura do Fosfato <br />
                de 46 a 50ºC
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- TEMPERATURA DA TINTA (KTL) -->
      <div class="p-col-3 box-stretched">
        <Knob
          v-bind:modelValue="tmp_KTL"
          v-bind:size="tamanho1"
          readonly="true"
          strokeWidth="18"
          v-bind:valueColor="corTmp_KTL"
        />
      </div>
      <!-- TEMPERATURA DA CALDEIRA -->
      <div class="p-col-3 box-stretched">
        <Knob
          v-bind:modelValue="tmp_Cald"
          v-bind:size="tamanho1"
          :min="0"
          :max="140"
          readonly="true"
          strokeWidth="18"
          v-bind:valueColor="corTmp_Cald"
        />
      </div>
      <!-- TEMPERATURA DA ESTUFA -->
      <div class="p-col-3">
        <div class="p-grid">
                <!-- Entrada Estufa -->
          <div class="p-col-12">
            <Knob
              v-bind:modelValue="temperEntEstEcoat"
              :size="150"
              :max="260"
              readonly="true"
              strokeWidth="12"
          v-bind:valueColor="corTmp_EntEst"
            />
          </div>
          <div
            class="p-col-12 SubTitulo">
            Temperatura da Entrada da Estufa <br />
            de 150 a 180ºC
          </div>
                <!-- Saída Estufa -->
                    <div class="p-col-12">
            <Knob
              v-bind:modelValue="temperSaiEstEcoat"
              :size="150"
              :max="260"
              readonly="true"
              strokeWidth="12"
          v-bind:valueColor="corTmp_SaiEst"
            />
          </div>
          <div
            class="p-col-12 SubTitulo">
            Temperatura da Saída da Estufa<br />
            de 210 a 240ºC
          </div>
        </div>
      </div>
      <!-- TÍTULOS - LINHA INFERIOR -->
      <div class="p-col-3 SubTitulo1">Temperaturas dos Tanques</div>
      <div class="p-col-3 SubTitulo1" v-bind:class="{ Falha: falha_tmp_KTL }">
        Temperatura da Tinta <br />
        de 29 a 31ºC
      </div>
      <div class="p-col-3 SubTitulo1" v-bind:class="{ Falha: falha_Cald }">
        Temperatura da Caldeira <br />
        de 95 a 115ºC
      </div>
      <div class="p-col-3 SubTitulo1">Temperaturas da Estufa</div>
    </div>
  </div>

</template>

<script>
export default {
  name: "ecoat",
  components: {},

  /*
  created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  unmounted() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  methods: {
    myEventHandler() {
      if (window.innerHeight < window.window.innerWidth - 400) {
        this.tamanho1 = window.innerHeight / 2;
      } else {
        this.tamanho1 =
          (window.innerWidth - (window.innerHeight - window.innerWidth) - 700) /
          2;
      }

      // your code for handling resize...
    },
  },
  */
  data() {
    return {
      tamanho1: 240,
    };
  },
  props: {
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


