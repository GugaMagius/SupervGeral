
<template>
  <div class="flexgrid-demo p-p-2">
    <div class="p-grid">
      <!-- TEMPERATURA DA TINTA (KTL) -->
      <div class="p-col-6 box-stretched">
        <Knob
          v-bind:modelValue="tmp_KTL"
          v-bind:size="tamanho1"
          readonly="true"
          strokeWidth="18"
          v-bind:valueColor="corTmp_KTL"
        />
      </div>
      <!-- TEMPERATURA DA CALDEIRA -->
      <div class="p-col-6 box-stretched">
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
       <!-- TÍTULOS - LINHA INFERIOR -->
      <div class="p-col-6 SubTitulo1" v-bind:class="{ Falha: falha_tmp_KTL }">
        Temperatura da Tinta <br/>
        de 29 a 31ºC
      </div>
      <div class="p-col-6 SubTitulo1" v-bind:class="{ Falha: falha_Cald }">
        Temperatura da Caldeira <br/>
        de 110 a 130ºC
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "ktl_caldeira",
  components: {},
  data() {
    return {
      tamanho1: 240,
    };
  },
  props: {
    tmp_KTL: Number,
    corTmp_KTL: String,
    tmp_Cald: Number,
    corTmp_Cald: String,
    corTmp_Fosfato: String,
    falha_tmp_KTL: Boolean,
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


