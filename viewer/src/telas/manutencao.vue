
<template>
    <div class="flexgrid-demo p-p-2">
      <div class="p-grid">
        <!-- TEMPERATURA DA TINTA (KTL) -->
        <div class="p-col-6 box">
          <Utilidades :Variaveis="Variaveis" />
        </div>
        <!-- TEMPERATURA DA CALDEIRA -->
        <div class="p-col-6 box">
          <KtlCaldeira :Variaveis="Variaveis" />
        </div>
      </div>
    </div>
</template>

<script>
import Utilidades from "@/telas/utilidades.vue";
import KtlCaldeira from "@/telas/Components/ktl_caldeira.vue";

export default {
  name: "manutencao",

  components: {
    Utilidades,
    KtlCaldeira,
  },
  data() {
    return {
      Titulo: " - Manutenção"
      };

  },

  props: {
    Variaveis: Object
  },
};
</script>

<style>
</style>


