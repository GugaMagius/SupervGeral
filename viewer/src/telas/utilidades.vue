<template>
  <div class="Sinotico">
    <table class="Tabela">
      <tr>
        <!-- NÍVEL DE ÁGUA PRINCIPAL -->
        <td class="NivelAgua">
          {{ !StatusConnect.ecoat? 0 : Variaveis.nivel_Agua.valor }} %
          <div id="Fdo">
            <div
              id="Bar"
              v-bind:style="{
                height: compHeightNivelGr,
                top: computedMarginNivelGr,
                'background-color': !StatusConnect.ecoat? 'grey' : corNv_Agua,
              }"
            ></div>
          </div>
        </td>
        <!-- NÍVEL DE ÁGUA DO REFEITÓRIO -->
        <td class="NivelAgua">
          {{ !StatusConnect.auditorio? 0 : Variaveis.nivel_Ag_Ref.valor }} %
          <div id="Fdo">
            <div
              id="Bar"
              v-bind:style="{
                height: compHeightNivelRf,
                top: computedMarginNivelRf,
                'background-color': !StatusConnect.auditorio? 'grey' : corNv_Ag_Ref,
              }"
            ></div>
          </div>
        </td>
        <td>
          <!-- VAZÃO DE AR-COMPRIMIDO -->
          <div v-if="Variaveis.vazaoArComp.valor>0">
            <Knob
              v-bind:modelValue="!StatusConnect.ecoat? null : Variaveis.vazaoArComp.valor"
              v-bind:size="240"
              :max="1600"
              readonly="true"
              strokeWidth="18"
              v-bind:valueColor="!StatusConnect.ecoat? 'grey' : Variaveis.vazaoArComp.cor"
            />
          </div>
        </td>
      </tr>
      <tr>
        <td v-bind:class="{ Falha: !StatusConnect.ecoat? null : Variaveis.falha_nivel_Agua.valor }">
          Nível Caixa água Estac. <br />
          acima de {{Variaveis.min1_Ag_Ref.valor}}%
        </td>
        <td>
          Nível Caixa água Refeitório<br />
          acima de {{Variaveis.min1_Ag_Ref.valor}} %
        </td>
        <td v-if="Variaveis.vazaoArComp.valor>0">
          Vazão de ar-comprimido<br />
          abaixo de {{Variaveis.max_VazArComp1.valor}} m3/h
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "utilidades",
  components: {},
  data() {
    return {
      Titulo: " - Utilidades",
    };
  },

  props: {
    Variaveis: Object,
    StatusConnect: Object
  },

  computed: {
    compHeightNivelGr: function () {
      return !this.StatusConnect.ecoat? 0 : this.Variaveis.nivel_Agua.valor + "%";
    },
    computedMarginNivelGr: function () {
      return 100 - this.Variaveis.nivel_Agua.valor + "%";
    },
    compHeightNivelRf: function () {
      return !this.StatusConnect.auditorio? 0 : this.Variaveis.nivel_Ag_Ref.valor + "%";
    },
    computedMarginNivelRf: function () {
      return 100 - this.Variaveis.nivel_Ag_Ref.valor + "%";
    },
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
  margin-top: 60px;
}
.red {
  stroke: red;
}

.Tabela {
  width: 100%;
  height: 100%;
  max-height: 100%;
}

.SubTitulo {
  font-size: 2vh;
  margin-top: -1vh;
  padding-top: 0px;
  margin-bottom: -2vh;
}

.Principal {
  height: 100%;
  width: 100%;
}

#Fdo {
  position: relative;
  height: 60vh;
  width: 10vw;
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

.NivelAgua {
  height: 90%;
}

.Titulo {
  height: auto;
  background-color: var(--surface-a);
  padding: 10px;
}

.Sinotico {
  height: auto;
  max-height: 70%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  width: 100%;
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


