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
              <div class="box campo" :class="{ stsFalha: falhaQuem1PP }">
                Queimador 1
              </div>
            </div>
            <!-- Queimador 2 -->
            <div class="p-col-3">
              <div class="box campo" :class="{ stsFalha: falhaQuem2PP }">
                Queimador 2
              </div>
            </div>
            <!-- Queimador 3 -->
            <div class="p-col-3">
              <div class="box campo" :class="{ stsFalha: falhaQuem3PP }">
                Queimador 3
              </div>
            </div>
            <!-- Queimador 4 -->
            <div class="p-col-3">
              <div class="box campo" :class="{ stsFalha: falhaQuem4PP }">
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
              <div
                class="box"
                v-bind:class="[
                  falhaTemp1PP ? 'dispTempAtualFalha' : 'dispTempAtual',
                ]"
              >
                <p>{{ temperQueim1PP }}ºC</p>
              </div>
            </div>
            <!-- Queimador 2 -->
            <div class="p-col-3">
              <div
                class="box"
                v-bind:class="[
                  falhaTemp2PP ? 'dispTempAtualFalha' : 'dispTempAtual',
                ]"
              >
                <p>{{ temperQueim2PP }}ºC</p>
              </div>
            </div>
            <!-- Queimador 3 -->
            <div class="p-col-3">
              <div
                class="box"
                v-bind:class="[
                  falhaTemp3PP ? 'dispTempAtualFalha' : 'dispTempAtual',
                ]"
              >
                <p>{{ temperQueim3PP }}ºC</p>
              </div>
            </div>
            <!-- Queimador 4 -->
            <div class="p-col-3">
              <div
                class="box"
                v-bind:class="[
                  falhaTemp4PP ? 'dispTempAtualFalha' : 'dispTempAtual',
                ]"
              >
                <p>{{ temperQueim4PP }}ºC</p>
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
                <p>{{ spQueim1PP }} ºC</p>
              </div>
            </div>
            <!-- Queimador 2 -->
            <div class="p-col-3">
              <div class="box dispTempSP">
                <p>{{ spQueim2PP }} ºC</p>
              </div>
            </div>
            <!-- Queimador 3 -->
            <div class="p-col-3">
              <div class="box dispTempSP">
                <p>{{ spQueim3PP }} ºC</p>
              </div>
            </div>
            <!-- Queimador 4 -->
            <div class="p-col-3">
              <div class="box dispTempSP">
                <p>{{ spQueim4PP }} ºC</p>
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
                  <div
                    class="box"
                    :class="{
                      stsLigado: leitVent1PP,
                      stsDesligado: !leitVent1PP,
                    }"
                  ></div>
                </div>
                <div class="p-col-9">
                  <div
                    class="box dispVeloc"
                    :class="{ stsFalha: falhaVent1PP }"
                  >
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
                  <div
                    class="box"
                    :class="{
                      stsLigado: leitVent2PP,
                      stsDesligado: !leitVent2PP,
                    }"
                  ></div>
                </div>
                <div class="p-col-9">
                  <div
                    class="box dispVeloc"
                    :class="{ stsFalha: falhaVent2PP }"
                  >
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
                  <div
                    class="box"
                    :class="{
                      stsLigado: leitVent3PP,
                      stsDesligado: !leitVent3PP,
                    }"
                  ></div>
                </div>
                <div class="p-col-9">
                  <div
                    class="box dispVeloc"
                    :class="{ stsFalha: falhaVent3PP }"
                  >
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
                  <div
                    class="box"
                    :class="{
                      stsLigado: leitVent4PP,
                      stsDesligado: !leitVent4PP,
                    }"
                  ></div>
                </div>
                <div class="p-col-9">
                  <div
                    class="box dispVeloc"
                    :class="{ stsFalha: falhaVent4PP }"
                  >
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
                  <div
                    class="box"
                    :class="{
                      stsLigado: Queim1PPchmAt,
                      stsDesligado: !Queim1PPchmAt,
                    }"
                  ></div>
                </div>
                <div class="p-col-12">
                  <div
                    class="box"
                    :class="{
                      stsLigado: Queim1PPchmBx,
                      stsDesligado: !Queim1PPchmBx,
                    }"
                  ></div>
                </div>
                <div class="p-col-12">
                  <div
                    class="box"
                    :class="{
                      stsLigado: leitQuem1PP,
                      stsDesligado: !leitQuem1PP,
                    }"
                  ></div>
                </div>
              </div>
            </div>
            <!-- Queimador 2 -->
            <div class="p-col-3">
              <div class="p-grid">
                <div class="p-col-12">
                  <div
                    class="box"
                    :class="{
                      stsLigado: Queim2PPchmAt,
                      stsDesligado: !Queim2PPchmAt,
                    }"
                  ></div>
                </div>
                <div class="p-col-12">
                  <div
                    class="box"
                    :class="{
                      stsLigado: Queim2PPchmBx,
                      stsDesligado: !Queim2PPchmBx,
                    }"
                  ></div>
                </div>
                <div class="p-col-12">
                  <div
                    class="box"
                    :class="{
                      stsLigado: leitQuem2PP,
                      stsDesligado: !leitQuem2PP,
                    }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Queimador 3 -->
            <div class="p-col-3">
              <div class="p-grid">
                <div class="p-col-12">
                  <div
                    class="box"
                    :class="{
                      stsLigado: Queim3PPchmAt,
                      stsDesligado: !Queim3PPchmAt,
                    }"
                  ></div>
                </div>
                <div class="p-col-12">
                  <div
                    class="box"
                    :class="{
                      stsLigado: Queim3PPchmBx,
                      stsDesligado: !Queim3PPchmBx,
                    }"
                  ></div>
                </div>
                <div class="p-col-12">
                  <div
                    class="box"
                    :class="{
                      stsLigado: leitQuem3PP,
                      stsDesligado: !leitQuem3PP,
                    }"
                  ></div>
                </div>
              </div>
            </div>
            <!-- Queimador 4 -->
            <div class="p-col-3">
              <div class="p-grid">
                <div class="p-col-12">
                  <div
                    class="box"
                    :class="{
                      stsLigado: Queim4PPchmAt,
                      stsDesligado: !Queim4PPchmAt,
                    }"
                  ></div>
                </div>
                <div class="p-col-12">
                  <div
                    class="box"
                    :class="{
                      stsLigado: Queim4PPchmBx,
                      stsDesligado: !Queim4PPchmBx,
                    }"
                  ></div>
                </div>
                <div class="p-col-12">
                  <div
                    class="box"
                    :class="{
                      stsLigado: leitQuem4PP,
                      stsDesligado: !leitQuem4PP,
                    }"
                  ></div>
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
              <div
                class="box"
                :class="{
                  stsLigado: leitCortArPP,
                  stsDesligado: !leitCortArPP,
                }"
              ></div>
            </div>
            <!-- Espaço em branco -->
            <div class="p-col-1"></div>
            <!-- Monovia -->
            <div class="p-col-6">
              <div class="p-grid">
                <div class="p-col-2">
                  <div
                    class="box"
                    :class="{
                      stsLigado: stsMonoviaPP,
                      stsFalha: !stsMonoviaPP,
                    }"
                  ></div>
                </div>
                <div class="p-col-10">
                  <div class="box"
                  v-bind:class="[ stsVelMonovPP ? 'stsFalha' : 'dispVeloc', ]">
                    Velocidade atual: {{ velMonoviaPP }}m/min
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
            <Fila
              v-bind:aFilaPP="aFilaPP"
              v-bind:aPosRecPP="aPosRecPP"
              v-bind:recEstufaPP="recEstufaPP"
              ref="compFila"
            />
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
      Titulo: " - Pintura Pó"};
  },
  methods: {},
  nome: "pinturapo",
  components: {
    Fila,
  },


  updated: function () {

    this.$refs.compFila.atualizaFila();

  },
  props: {
    // Prop declarada no Router-view para leitura de uma variável
    aFilaPP: Array,
    aPosRecPP: Array,
    recEstufaPP: Number,
    velMonoviaPP: Number,
    stsMonoviaPP: Boolean,
    stsVelMonovPP: Boolean,
    temperQueim1PP: Number,
    temperQueim2PP: Number,
    temperQueim3PP: Number,
    temperQueim4PP: Number,
    spQueim1PP: Number,
    spQueim2PP: Number,
    spQueim3PP: Number,
    spQueim4PP: Number,
    leitVent1PP: Boolean,
    leitVent2PP: Boolean,
    leitVent3PP: Boolean,
    leitVent4PP: Boolean,
    leitQuem1PP: Boolean,
    leitQuem2PP: Boolean,
    leitQuem3PP: Boolean,
    leitQuem4PP: Boolean,
    falhaQuem1PP: Boolean,
    falhaQuem2PP: Boolean,
    falhaQuem3PP: Boolean,
    falhaQuem4PP: Boolean,
    falhaVent1PP: Boolean,
    falhaVent2PP: Boolean,
    falhaVent3PP: Boolean,
    falhaVent4PP: Boolean,
    leitCortArPP: Boolean,
    falhaTemp1PP: Boolean,
    falhaTemp2PP: Boolean,
    falhaTemp3PP: Boolean,
    falhaTemp4PP: Boolean,
    Queim1PPchmBx: Boolean,
    Queim1PPchmAt: Boolean,
    Queim2PPchmBx: Boolean,
    Queim2PPchmAt: Boolean,
    Queim3PPchmBx: Boolean,
    Queim3PPchmAt: Boolean,
    Queim4PPchmBx: Boolean,
    Queim4PPchmAt: Boolean,
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