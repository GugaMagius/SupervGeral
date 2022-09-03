<template>
  <div class="flexgrid-demo p-p-2">
    <div class="p-grid">
      <div class="p-col-1">
        <div class="box-stretched">E-coat</div>
      </div>
      <div class="p-col-5">
        <div class="telaReduzida">
          <router-link to="/ecoat">
            <Ecoat :Variaveis="Variaveis" />
          </router-link>
        </div>
      </div>
      <div class="p-col-1">
        <div class="box-stretched"> Utilidades </div>
      </div>
      <div class="p-col-5">
        <div class="telaReduzida">
          <router-link to="/utilidades">
          <Utilidades :Variaveis="Variaveis" />
          </router-link>
        </div>
      </div>
      <div class="p-col-1">
        <div class="box-stretched"> Pintura pó </div>
      </div>
      <div class="p-col-5">
        <div class="telaReduzida">
          <router-link to="/pinturapo">
          <PinturaPo :Variaveis="Variaveis" />
          </router-link>
        </div>
      </div>
      <div class="p-col-1">
        <div class="box-stretched"> Pintura líquida </div>
      </div>
      <div class="p-col-5">
        <div class="telaReduzida">
          <router-link to="/pinturaliq">
          <PinturaLiq :Variaveis="Variaveis" />
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
    Variaveis: Object
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

