<template>
  <div class="flexgrid-demo p-p-2">
    <div class="p-grid">
      <div class="p-col-1">
        <div class="box-stretched">E-coat</div>
      </div>
      <div class="p-col-5">
        <div class="telaReduzida">
          <router-link to="/ecoat">
            <Ecoat
              :temperEntEstEcoat="temperEntEstEcoat"
              :temperSaiEstEcoat="temperSaiEstEcoat"
              :corTmp_EntEst="corTmp_EntEst"
              :corTmp_SaiEst="corTmp_SaiEst"
              :tmp_KTL="tmp_KTL"
              :corTmp_KTL="corTmp_KTL"
              :tmp_Cald="tmp_Cald"
              :corTmp_Cald="corTmp_Cald"
              :tmp_Acido1="tmp_Acido1"
              :corTmp_Acido1="corTmp_Acido1"
              :tmp_Acido2="tmp_Acido2"
              :corTmp_Acido2="corTmp_Acido2"
              :tmp_Deseng1="tmp_Deseng1"
              :corTmp_Deseng1="corTmp_Deseng1"
              :tmp_Deseng2="tmp_Deseng2"
              :corTmp_Deseng2="corTmp_Deseng2"
              :tmp_Fosfato="tmp_Fosfato"
              :corTmp_Fosfato="corTmp_Fosfato"
              :falha_tmp_KTL="falha_tmp_KTL"
              :falha_Critica="falha_Critica"
              :falha_Acido1="falha_Acido1"
              :falha_Acido2="falha_Acido2"
              :falha_Desg1="falha_Desg1"
              :falha_Desg2="falha_Desg2"
              :falha_Fosf="falha_Fosf"
              :falha_Cald="falha_Cald"
            />
          </router-link>
        </div>
      </div>
      <div class="p-col-1">
        <div class="box-stretched"> Utilidades </div>
      </div>
      <div class="p-col-5">
        <div class="telaReduzida">
          <router-link to="/utilidades">
          <Utilidades
            :nivel_Agua="nivel_Agua"
            :nivel_Ag_Ref="nivel_Ag_Ref"
            :falha_nivel_Agua="falha_nivel_Agua"
            :vazaoArComp="vazaoArComp"
            :corVazArComp="corVazArComp"
          />
          </router-link>
        </div>
      </div>
      <div class="p-col-1">
        <div class="box-stretched"> Pintura pó </div>
      </div>
      <div class="p-col-5">
        <div class="telaReduzida">
          <router-link to="/pinturapo">
          <PinturaPo
            :recEstufaPP="recEstufaPP"
            :aFilaPP="aFilaPP"
            :aPosRecPP="aPosRecPP"
            :velMonoviaPP="velMonoviaPP"
            :stsMonoviaPP="stsMonoviaPP"
            :stsVelMonovPP="stsVelMonovPP"
            :temperQueim1PP="temperQueim1PP"
            :temperQueim2PP="temperQueim2PP"
            :temperQueim3PP="temperQueim3PP"
            :temperQueim4PP="temperQueim4PP"
            :spQueim1PP="spQueim1PP"
            :spQueim2PP="spQueim2PP"
            :spQueim3PP="spQueim3PP"
            :spQueim4PP="spQueim4PP"
            :leitVent1PP="leitVent1PP"
            :leitVent2PP="leitVent2PP"
            :leitVent3PP="leitVent3PP"
            :leitVent4PP="leitVent4PP"
            :leitQuem1PP="leitQuem1PP"
            :leitQuem2PP="leitQuem2PP"
            :leitQuem3PP="leitQuem3PP"
            :leitQuem4PP="leitQuem4PP"
            :falhaQuem1PP="falhaQuem1PP"
            :falhaQuem2PP="falhaQuem2PP"
            :falhaQuem3PP="falhaQuem3PP"
            :falhaQuem4PP="falhaQuem4PP"
            :falhaVent1PP="falhaVent1PP"
            :falhaVent2PP="falhaVent2PP"
            :falhaVent3PP="falhaVent3PP"
            :falhaVent4PP="falhaVent4PP"
            :leitCortArPP="leitCortArPP"
            :falhaTemp1PP="falhaTemp1PP"
            :falhaTemp2PP="falhaTemp2PP"
            :falhaTemp3PP="falhaTemp3PP"
            :falhaTemp4PP="falhaTemp4PP"
            :Queim1PPchmBx="Queim1PPchmBx"
            :Queim1PPchmAt="Queim1PPchmAt"
            :Queim2PPchmBx="Queim2PPchmBx"
            :Queim2PPchmAt="Queim2PPchmAt"
            :Queim3PPchmBx="Queim3PPchmBx"
            :Queim3PPchmAt="Queim3PPchmAt"
            :Queim4PPchmBx="Queim4PPchmBx"
            :Queim4PPchmAt="Queim4PPchmAt"
          />
          </router-link>
        </div>
      </div>
      <div class="p-col-1">
        <div class="box-stretched"> Pintura líquida </div>
      </div>
      <div class="p-col-5">
        <div class="telaReduzida">
          <router-link to="/pinturaliq">
          <PinturaLiq
            :recEstufaPL="recEstufaPL"
            :aFilaPL="aFilaPL"
            :aPosRecPL="aPosRecPL"
            :velMonoviaPL="velMonoviaPL"
            :stsMonoviaPL="stsMonoviaPL"
            :temperQueim1PL="temperQueim1PL"
            :temperQueim2PL="temperQueim2PL"
            :spQueim1PL="spQueim1PL"
            :spQueim2PL="spQueim2PL"
            :leitVent1PL="leitVent1PL"
            :leitVent2PL="leitVent2PL"
            :leitQuem1PL="leitQuem1PL"
            :leitQuem2PL="leitQuem2PL"
            :falhaQuem1PL="falhaQuem1PL"
            :falhaQuem2PL="falhaQuem2PL"
            :falhaVent1PL="falhaVent1PL"
            :falhaVent2PL="falhaVent2PL"
            :leitCortArPL="leitCortArPL"
            :falhaTemp1PL="falhaTemp1PL"
            :falhaTemp2PL="falhaTemp2PL"
            :Queim1PLchmBx="Queim1PLchmBx"
            :Queim1PLchmAt="Queim1PLchmAt"
            :Queim2PLchmBx="Queim2PLchmBx"
            :Queim2PLchmAt="Queim2PLchmAt"
          />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ecoat from "@/telas/ecoat.vue";
import Utilidades from "@/telas/utilidades.vue";
import PinturaPo from "@/telas/pinturapo.vue";
import PinturaLiq from "@/telas/pinturaliq.vue";

export default {
  name: "mosaico",
  data() {
    return {
      Titulo: " - Geral"

    }
  },
  components: {
    Ecoat,
    Utilidades,
    PinturaPo,
    PinturaLiq,
  },
  props: {
    // Manutenção
    nivel_Agua: Number,
    nivel_Ag_Ref: Number,
    falha_nivel_Agua: Boolean,
    // Ecoat
    temperEntEstEcoat: Number,
    corTmp_EntEst: Number,
    temperSaiEstEcoat: Number,
    corTmp_SaiEst: Number,
    tmp_KTL: Number,
    corTmp_KTL: String,
    tmp_Cald: Number,
    corTmp_Cald: String,
    vazaoArComp: Number,
    corVazArComp: String,
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
    // Pintura pó
    recEstufaPP: Number,
    aFilaPP: Array,
    aPosRecPP: Array,
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
    // Pintura líquida
    velMonoviaPL: Number,
    stsMonoviaPL: Boolean,
    temperQueim1PL: Number,
    temperQueim2PL: Number,
    spQueim1PL: Number,
    spQueim2PL: Number,
    leitVent1PL: Boolean,
    leitVent2PL: Boolean,
    leitQuem1PL: Boolean,
    leitQuem2PL: Boolean,
    falhaQuem1PL: Boolean,
    falhaQuem2PL: Boolean,
    falhaVent1PL: Boolean,
    falhaVent2PL: Boolean,
    leitCortArPL: Boolean,
    falhaTemp1PL: Boolean,
    falhaTemp2PL: Boolean,
    Queim1PLchmBx: Boolean,
    Queim1PLchmAt: Boolean,
    Queim2PLchmBx: Boolean,
    Queim2PLchmAt: Boolean,
  },
};
</script>

<style scoped>

.p-grid {
  width: 98%;
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
  display: flex;
  transform: rotate(270deg);
  align-items: center;
  justify-content: center;
  vertical-align: middle;
}

.telaReduzida {
  zoom: 0.70;
  -moz-transform: scale(0.70);
  -webkit-transform: scale(0.70);
  transform: scale(0.70);
  width: auto;
  height: auto;
  margin-top: -10vh;
  margin-left: -15vw;
  margin-right: -15vw;
  margin-bottom: -10vh;
}

/* unvisited link */
a:link {
  color: var(--text-color);
  text-decoration: none;
}

/* visited link */
a:visited {
  color: var(--text-color);
  text-decoration: none;
}

/* mouse over link */
a:hover {
  color: var(--text-color);
  text-decoration: none;
}

/* selected link */
a:active {
  color: var(--text-color);
  text-decoration: none;
}
</style>
<!--
<style scoped>

.box {
  background-color: aqua;
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

.telaReduzida {
  zoom: 0.65;
  -moz-transform: scale(0.65);
  -webkit-transform: scale(0.65);
  transform: scale(0.65);
  width: 99%;
}

.p-grid {
  position: absolute;
  padding: 0px;
  padding-right: -200px;
  margin-left: 0vw;
  margin-right: -200px;
  width: 100%;
  margin-top: -8vh;
}

.p-col-6 {
  width: 49%;
  padding: 0px;
  margin: 0px;
  margin-top: 0vh;
  margin-bottom: -15vh;
  padding-left: 0vw;
  padding-right: -8vw;
  margin-left: -12vw;
  margin-right: -15vw;
}

/* unvisited link */
a:link {
  color: var(--text-color);
  text-decoration: none;
}

/* visited link */
a:visited {
  color: var(--text-color);
  text-decoration: none;
}

/* mouse over link */
a:hover {
  color: var(--text-color);
  text-decoration: none;
}

/* selected link */
a:active {
  color: var(--text-color);
  text-decoration: none;
}
</style>
-->

