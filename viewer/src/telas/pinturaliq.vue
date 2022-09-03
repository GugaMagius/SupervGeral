<template>
    <div class="flexgrid-demo p-p-2">
      <div class="p-grid">
        <!-- ************************************************************************************************************** -->
        <!-- TÍTULO -->

        <!--
          
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
        -->
        <div class="p-col-1"></div>

        <div class="p-col-11">
          <div class="p-grid">
            <!-- Queimador 1 -->
            <div class="p-col-6">
              <div class="box campo" :class="{ stsFalha: Variaveis.falhaQuem1PL.valor }">
                Queimador 1
              </div>
            </div>
            <!-- Queimador 2 -->
            <div class="p-col-6">
              <div class="box campo" :class="{ stsFalha: Variaveis.falhaQuem2PL.valor }">
                Queimador 2
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
            <div class="p-col-6">
              <div
                class="box"
                v-bind:class="[ Variaveis.falhaTemp1PL.valor ? 'dispTempAtualFalha' : 'dispTempAtual'  ]"
              >
                <p>{{ Variaveis.temperQueim1PL.valor }} ºC</p>
              </div>
            </div>
            <!-- Queimador 2 -->
            <div class="p-col-6">
              <div
                class="box"
                v-bind:class="[ Variaveis.falhaTemp2PL.valor ? 'dispTempAtualFalha' : 'dispTempAtual'  ]"
              >
                <p>{{ Variaveis.temperQueim2PL.valor }} ºC</p>
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
            <div class="p-col-6">
              <div class="box dispTempSP">
                <p>{{ Variaveis.spQueim1PL.valor }} ºC</p>
              </div>
            </div>
            <!-- Queimador 2 -->
            <div class="p-col-6">
              <div class="box dispTempSP">
                <p>{{ Variaveis.spQueim2PL.valor }} ºC</p>
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
            <div class="p-col-6">
              <div class="p-grid">
                  <div class="p-col-1"></div>
                <div class="p-col-2">
                  <div
                    class="box"
                    :class="{
                      stsLigado: Variaveis.leitVent1PL.valor,
                      stsDesligado: !Variaveis.leitVent1PL.valor,
                    }"
                  ></div>
                </div>
                <div class="p-col-9">
                  <div
                    class="box dispVeloc"
                    :class="{ stsFalha: Variaveis.falhaVent1PL.valor }"
                  >
                    <p>3450rpm</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Ventilador 2 -->
            <div class="p-col-6">
              <div class="p-grid">
                  <div class="p-col-1"></div>
                <div class="p-col-2">
                  <div
                    class="box"
                    :class="{
                      stsLigado: Variaveis.leitVent2PL.valor,
                      stsDesligado: !Variaveis.leitVent2PL.valor,
                    }"
                  ></div>
                </div>
                <div class="p-col-9">
                  <div
                    class="box dispVeloc"
                    :class="{ stsFalha: Variaveis.falhaVent2PL.valor }"
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
            <div class="p-col-6">
              <div class="p-grid">
                <div class="p-col-12">
                  <div
                    class="box"
                    :class="{
                      stsLigado: Variaveis.Queim1PLchmAt.valor,
                      stsDesligado: !Variaveis.Queim1PLchmAt.valor,
                    }"
                  ></div>
                </div>
                <div class="p-col-12">
                  <div
                    class="box"
                    :class="{
                      stsLigado: Variaveis.Queim1PLchmBx.valor,
                      stsDesligado: !Variaveis.Queim1PLchmBx.valor,
                    }"
                  ></div>
                </div>
                <div class="p-col-12">
                  <div
                    class="box"
                    :class="{
                      stsLigado: Variaveis.leitQuem1PL.valor,
                      stsDesligado: !Variaveis.leitQuem1PL.valor,
                    }"
                  ></div>
                </div>
              </div>
            </div>
            <!-- Queimador 2 -->
            <div class="p-col-6">
              <div class="p-grid">
                <div class="p-col-12">
                  <div
                    class="box"
                    :class="{
                      stsLigado: Variaveis.Queim2PLchmAt.valor,
                      stsDesligado: !Variaveis.Queim2PLchmAt.valor,
                    }"
                  ></div>
                </div>
                <div class="p-col-12">
                  <div
                    class="box"
                    :class="{
                      stsLigado: Variaveis.Queim2PLchmBx.valor,
                      stsDesligado: !Variaveis.Queim2PLchmBx.valor,
                    }"
                  ></div>
                </div>
                <div class="p-col-12">
                  <div
                    class="box"
                    :class="{
                      stsLigado: Variaveis.leitQuem2PL.valor,
                      stsDesligado: !Variaveis.leitQuem2PL.valor,
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
              <div class="box campo">
                Cortina de ar
              </div>
            </div>
            <!-- Espaço em branco -->
            <div class="p-col-1">
            </div>
            <!-- Monovia -->
            <div class="p-col-6">
              <div class="box campo">
                Monovia
              </div>
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
                  <div class="box" :class="{ stsLigado: Variaveis.leitCortArPL.valor, stsDesligado: !Variaveis.leitCortArPL.valor, }"></div>
            </div>
            <!-- Espaço em branco -->
            <div class="p-col-1">
            </div>
            <!-- Monovia -->
            <div class="p-col-6">
              <div class="p-grid">
                <div class="p-col-2">
                  <div class="box" :class="{ stsLigado: Variaveis.stsMonoviaPL.valor, stsFalha: !Variaveis.stsMonoviaPL.valor, }"></div>
                </div>
                <div class="p-col-10">
                  <div class="box dispVeloc">
                    Velocidade atual: {{ Variaveis.velMonoviaPL.valor }}m/min
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- FIM -->
        
      </div>
    </div>
</template>

<script>
export default {
  nome: "pinturapo",
  data() {
    return {
      Titulo: " - Pintura Líquida"
      }
  },
  props: {
    // Prop declarada no Router-view para leitura de uma variável
    Variaveis: Object

  },
};
</script>

<style>
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
  background-color:lightgreen;
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
  color:  var(--primary-color);
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>