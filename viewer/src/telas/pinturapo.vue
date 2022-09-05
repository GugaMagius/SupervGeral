<template>
  <div class="flexgrid-demo p-p-2">
    <div class="p-grid">
      <!-- ************************************************************************************************************** -->
      <!-- TÍTULO -->
      <div class="p-col-1"></div>

      <div class="p-col-11">
        <div class="p-grid">
          <!-- Queimador 1 -->
          <div class="p-col-3">
            <div class="box campo" :class="{ stsFalha: !StatusConnect.pinturapo ? null : Variaveis.falhaQuem1PP.valor }">
              Queimador 1
            </div>
          </div>
          <!-- Queimador 2 -->
          <div class="p-col-3">
            <div class="box campo" :class="{ stsFalha: !StatusConnect.pinturapo ? null : Variaveis.falhaQuem2PP.valor }">
              Queimador 2
            </div>
          </div>
          <!-- Queimador 3 -->
          <div class="p-col-3">
            <div class="box campo" :class="{ stsFalha: !StatusConnect.pinturapo ? null : Variaveis.falhaQuem3PP.valor }">
              Queimador 3
            </div>
          </div>
          <!-- Queimador 4 -->
          <div class="p-col-3">
            <div class="box campo" :class="{ stsFalha: !StatusConnect.pinturapo ? null : Variaveis.falhaQuem4PP.valor }">
              Queimador 4
            </div>
          </div>
        </div>
      </div>

      <!-- ************************************************************************************************************** -->
      <!-- VALORES ATUAIS DE TEMPERATURA -->
      <div class="p-col-1">
        <div class="box campo variavel">Temperatura Atual</div>
      </div>

      <div class="p-col-11">
        <div class="p-grid">
          <!-- Queimador 1 -->
          <div class="p-col-3">
            <div class="box" v-bind:class="[
              !StatusConnect.pinturapo ? null : Variaveis.falhaTemp1PP.valor ? 'dispTempAtualFalha' : 'dispTempAtual',
            ]">
              <p>{{ !StatusConnect.pinturapo ? null : Variaveis.temperQueim1PP.valor }}ºC</p>
            </div>
          </div>
          <!-- Queimador 2 -->
          <div class="p-col-3">
            <div class="box" v-bind:class="[
              !StatusConnect.pinturapo ? null : Variaveis.falhaTemp2PP.valor ? 'dispTempAtualFalha' : 'dispTempAtual',
            ]">
              <p>{{ !StatusConnect.pinturapo ? null : Variaveis.temperQueim2PP.valor }}ºC</p>
            </div>
          </div>
          <!-- Queimador 3 -->
          <div class="p-col-3">
            <div class="box" v-bind:class="[
              !StatusConnect.pinturapo ? null : Variaveis.falhaTemp3PP.valor ? 'dispTempAtualFalha' : 'dispTempAtual',
            ]">
              <p>{{ !StatusConnect.pinturapo ? null : Variaveis.temperQueim3PP.valor }}ºC</p>
            </div>
          </div>
          <!-- Queimador 4 -->
          <div class="p-col-3">
            <div class="box" v-bind:class="[
              !StatusConnect.pinturapo ? null : Variaveis.falhaTemp4PP.valor ? 'dispTempAtualFalha' : 'dispTempAtual',
            ]">
              <p>{{ !StatusConnect.pinturapo ? null : Variaveis.temperQueim4PP.valor }}ºC</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ************************************************************************************************************** -->
      <!-- VALORES  DE SETPOINT DE TEMPERATURA -->
      <div class="p-col-1">
        <div class="box campo variavel">SetPoint de Temperatura</div>
      </div>

      <div class="p-col-11">
        <div class="p-grid">
          <!-- Queimador 1 -->
          <div class="p-col-3">
            <div class="box dispTempSP">
              <p>{{ !StatusConnect.pinturapo ? null : Variaveis.spQueim1PP.valor }} ºC</p>
            </div>
          </div>
          <!-- Queimador 2 -->
          <div class="p-col-3">
            <div class="box dispTempSP">
              <p>{{ !StatusConnect.pinturapo ? null : Variaveis.spQueim2PP.valor }} ºC</p>
            </div>
          </div>
          <!-- Queimador 3 -->
          <div class="p-col-3">
            <div class="box dispTempSP">
              <p>{{ !StatusConnect.pinturapo ? null : Variaveis.spQueim3PP.valor }} ºC</p>
            </div>
          </div>
          <!-- Queimador 4 -->
          <div class="p-col-3">
            <div class="box dispTempSP">
              <p>{{ !StatusConnect.pinturapo ? null : Variaveis.spQueim4PP.valor }} ºC</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ************************************************************************************************************** -->
      <!-- STATUS DOS VENTILADORES -->
      <div class="p-col-1">
        <div class="box campo variavel">Ventiladores</div>
      </div>

      <div class="p-col-11">
        <div class="p-grid">
          <!-- Ventilador 1 -->
          <div class="p-col-3">
            <div class="p-grid">
              <div class="p-col-1"></div>
              <div class="p-col-2">
                <div class="box" :class="{
                  stsLigado: !StatusConnect.pinturapo ? null : Variaveis.leitVent1PP.valor,
                  stsDesligado: !StatusConnect.pinturapo ? null : !Variaveis.leitVent1PP.valor,
                }"></div>
              </div>
              <div class="p-col-9">
                <div class="box dispVeloc"
                  :class="{ stsFalha: !StatusConnect.pinturapo ? null : Variaveis.falhaVent1PP.valor }">
                  <p>3450rpm</p>
                </div>
              </div>
            </div>
          </div>
          <!-- Ventilador 2 -->
          <div class="p-col-3">
            <div class="p-grid">
              <div class="p-col-1"></div>
              <div class="p-col-2">
                <div class="box" :class="{
                  stsLigado: !StatusConnect.pinturapo ? null : Variaveis.leitVent2PP.valor,
                  stsDesligado: !StatusConnect.pinturapo ? null : !Variaveis.leitVent2PP.valor,
                }"></div>
              </div>
              <div class="p-col-9">
                <div class="box dispVeloc"
                  :class="{ stsFalha: !StatusConnect.pinturapo ? null : Variaveis.falhaVent2PP.valor }">
                  <p>3450rpm</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Ventilador 3 -->
          <div class="p-col-3">
            <div class="p-grid">
              <div class="p-col-1"></div>
              <div class="p-col-2">
                <div class="box" :class="{
                  stsLigado: !StatusConnect.pinturapo ? null : Variaveis.leitVent3PP.valor,
                  stsDesligado: !StatusConnect.pinturapo ? null : !Variaveis.leitVent3PP.valor,
                }"></div>
              </div>
              <div class="p-col-9">
                <div class="box dispVeloc"
                  :class="{ stsFalha: !StatusConnect.pinturapo ? null : Variaveis.falhaVent3PP.valor }">
                  <p>3450rpm</p>
                </div>
              </div>
            </div>
          </div>
          <!-- Ventilador 4 -->
          <div class="p-col-3">
            <div class="p-grid">
              <div class="p-col-1"></div>
              <div class="p-col-2">
                <div class="box" :class="{
                  stsLigado: !StatusConnect.pinturapo ? null : Variaveis.leitVent4PP.valor,
                  stsDesligado: !StatusConnect.pinturapo ? null : !Variaveis.leitVent4PP.valor,
                }"></div>
              </div>
              <div class="p-col-9">
                <div class="box dispVeloc"
                  :class="{ stsFalha: !StatusConnect.pinturapo ? null : Variaveis.falhaVent4PP.valor }">
                  <p>3450rpm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ************************************************************************************************************** -->
      <!-- STATUS DOS QUEIMADORES -->
      <div class="p-col-1">
        <div class="box campo box-stretched variavel">Queimadores</div>
      </div>

      <div class="p-col-11">
        <div class="p-grid">
          <!-- Queimador 1 -->
          <div class="p-col-3">
            <div class="p-grid">
              <div class="p-col-12">
                <div class="box" :class="{
                  stsLigado: !StatusConnect.pinturapo ? null : Variaveis.Queim1PPchmAt.valor,
                  stsDesligado: !StatusConnect.pinturapo ? null : !Variaveis.Queim1PPchmAt.valor,
                }"></div>
              </div>
              <div class="p-col-12">
                <div class="box" :class="{
                  stsLigado: !StatusConnect.pinturapo ? null : Variaveis.Queim1PPchmBx.valor,
                  stsDesligado: !StatusConnect.pinturapo ? null : !Variaveis.Queim1PPchmBx.valor,
                }"></div>
              </div>
              <div class="p-col-12">
                <div class="box" :class="{
                  stsLigado: !StatusConnect.pinturapo ? null : Variaveis.leitQuem1PP.valor,
                  stsDesligado: !StatusConnect.pinturapo ? null : !Variaveis.leitQuem1PP.valor,
                }"></div>
              </div>
            </div>
          </div>
          <!-- Queimador 2 -->
          <div class="p-col-3">
            <div class="p-grid">
              <div class="p-col-12">
                <div class="box" :class="{
                  stsLigado: !StatusConnect.pinturapo ? null : Variaveis.Queim2PPchmAt.valor,
                  stsDesligado: !StatusConnect.pinturapo ? null : !Variaveis.Queim2PPchmAt.valor,
                }"></div>
              </div>
              <div class="p-col-12">
                <div class="box" :class="{
                  stsLigado: !StatusConnect.pinturapo ? null : Variaveis.Queim2PPchmBx.valor,
                  stsDesligado: !StatusConnect.pinturapo ? null : !Variaveis.Queim2PPchmBx.valor,
                }"></div>
              </div>
              <div class="p-col-12">
                <div class="box" :class="{
                  stsLigado: !StatusConnect.pinturapo ? null : Variaveis.leitQuem2PP.valor,
                  stsDesligado: !StatusConnect.pinturapo ? null : !Variaveis.leitQuem2PP.valor,
                }"></div>
              </div>
            </div>
          </div>

          <!-- Queimador 3 -->
          <div class="p-col-3">
            <div class="p-grid">
              <div class="p-col-12">
                <div class="box" :class="{
                  stsLigado: !StatusConnect.pinturapo ? null : Variaveis.Queim3PPchmAt.valor,
                  stsDesligado: !StatusConnect.pinturapo ? null : !Variaveis.Queim3PPchmAt.valor,
                }"></div>
              </div>
              <div class="p-col-12">
                <div class="box" :class="{
                  stsLigado: !StatusConnect.pinturapo ? null : Variaveis.Queim3PPchmBx.valor,
                  stsDesligado: !StatusConnect.pinturapo ? null : !Variaveis.Queim3PPchmBx.valor,
                }"></div>
              </div>
              <div class="p-col-12">
                <div class="box" :class="{
                  stsLigado: !StatusConnect.pinturapo ? null : Variaveis.leitQuem3PP.valor,
                  stsDesligado: !StatusConnect.pinturapo ? null : !Variaveis.leitQuem3PP.valor,
                }"></div>
              </div>
            </div>
          </div>
          <!-- Queimador 4 -->
          <div class="p-col-3">
            <div class="p-grid">
              <div class="p-col-12">
                <div class="box" :class="{
                  stsLigado: !StatusConnect.pinturapo ? null : Variaveis.Queim4PPchmAt.valor,
                  stsDesligado: !StatusConnect.pinturapo ? null : !Variaveis.Queim4PPchmAt.valor,
                }"></div>
              </div>
              <div class="p-col-12">
                <div class="box" :class="{
                  stsLigado: !StatusConnect.pinturapo ? null : Variaveis.Queim4PPchmBx.valor,
                  stsDesligado: !StatusConnect.pinturapo ? null : !Variaveis.Queim4PPchmBx.valor,
                }"></div>
              </div>
              <div class="p-col-12">
                <div class="box" :class="{
                  stsLigado: !StatusConnect.pinturapo ? null : Variaveis.leitQuem4PP.valor,
                  stsDesligado: !StatusConnect.pinturapo ? null : !Variaveis.leitQuem4PP.valor,
                }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ************************************************************************************************************** -->
      <!-- OUTROS EQUIPAMENTOS -->
      <!-- Titulos -->
      <div class="p-col-1"></div>

      <div class="p-col-11">
        <div class="p-grid">
          <!-- Cortina de ar -->
          <div class="p-col-1"></div>
          <div class="p-col-3">
            <div class="box campo">Cortina de ar</div>
          </div>
          <!-- Espaço em branco -->
          <div class="p-col-1"></div>
          <!-- Monovia -->
          <div class="p-col-6">
            <div class="box campo">Monovia</div>
          </div>
        </div>
      </div>
      <!-- Status -->
      <div class="p-col-1"></div>

      <div class="p-col-11">
        <div class="p-grid">
          <!-- Cortina de Ar  -->
          <div class="p-col-1"></div>
          <div class="p-col-3">
            <div class="box" :class="{
              stsLigado: !StatusConnect.pinturapo ? null : Variaveis.leitCortArPP.valor,
              stsDesligado: !StatusConnect.pinturapo ? null : !Variaveis.leitCortArPP.valor,
            }"></div>
          </div>
          <!-- Espaço em branco -->
          <div class="p-col-1"></div>
          <!-- Monovia -->
          <div class="p-col-6">
            <div class="p-grid">
              <div class="p-col-2">
                <div class="box" :class="{
                  stsLigado: !StatusConnect.pinturapo ? null : Variaveis.stsMonoviaPP.valor,
                  stsFalha: !StatusConnect.pinturapo ? null : !Variaveis.stsMonoviaPP.valor,
                }"></div>
              </div>
              <div class="p-col-10">
                <div class="box"
                  v-bind:class="[!StatusConnect.pinturapo ? null : Variaveis.stsVelMonovPP.valor ? 'stsFalha' : 'dispVeloc',]">
                  Velocidade atual: {{ !StatusConnect.pinturapo ? null : Variaveis.velMonoviaPP.valor }}m/min
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ************************************************************************************************************** -->
      <!-- Fila de Receitas -->
      <div class="p-col-1">
        <div class="box campo variavel">Fila de Receitas</div>
      </div>
      <div class="p-col-11">
        <div class="box">
          <Fila v-bind:aFilaPP="!StatusConnect.pinturapo ? null : Variaveis.aFilaPP.valor"
            v-bind:aPosRecPP="!StatusConnect.pinturapo ? null : Variaveis.aPosRecPP.valor"
            v-bind:recEstufaPP="!StatusConnect.pinturapo ? null : Variaveis.recEstufaPP.valor" ref="compFila" />
        </div>
      </div>
      <!-- FIM -->
    </div>
  </div>
</template>

<script>
import Fila from "@/telas/Components/fila.vue";

export default {
  data() {
    return {
      Titulo: " - Pintura Pó"
    };
  },
  methods: {},
  name: "pinturapo",
  components: {
    Fila,
  },


  updated: function () {

    if (this.StatusConnect.pinturapo === true) {

      this.$refs.compFila.atualizaFila();

    }

  },
  props: {
    // Prop declarada no Router-view para leitura de uma variável
    Variaveis: Object,
    StatusConnect: Object
  },
};
</script>

<style scoped>
.flexgrid-demo {
  background-color: var(--surface-b);
  color: var(--text-color);
}

.campo {
  background-color: var(--surface-e);
}

.box {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  margin-top: auto;
  margin-bottom: auto;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
}

.box-stretched {
  height: 100%;
}

.flhVent {
  background-color: red;
}

.stsLigado {
  background-color: lightgreen;
}

.stsDesligado {
  background-color: lightgrey;
}

.stsFalha {
  background-color: red;
}

.variavel {
  font-size: 1vw;
}

.dispTempAtualFalha {
  background-color: red;
  font-size: 5vw;
  color: white;
  padding-top: 0px;
}

.dispTempAtual {
  background-color: var(--surface-d);
  font-size: 5vw;
  color: var(--primary-color);
  padding-top: 0px;
}

.dispTempSP {
  background-color: var(--surface-d);
  font-size: 3.8vw;
  color: darkgoldenrod;
}

.dispVeloc {
  background-color: var(--surface-d);
  font-size: 2vw;
  color: var(--primary-color);
}

.box p {
  margin: 0;
}

.p-grid {
  padding: -5px;
  margin: -5px;
}

.p-col-2,
.p-col-5,
.p-col-10 {
  padding: -5px;
  margin: -5px;
}

.red {
  stroke: red;
}

.SubTitulo {
  font-size: 2vh;
  margin-top: -1vh;
  padding-top: 0px;
  margin-bottom: -2vh;
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
  height: 100%;
  max-height: 100%;
  margin-top: 0;
  top: 0;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>