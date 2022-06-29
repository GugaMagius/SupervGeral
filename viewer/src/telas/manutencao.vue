
<template>
    <div class="flexgrid-demo p-p-2">
      <div class="p-grid">
        <!-- TEMPERATURA DA TINTA (KTL) -->
        <div class="p-col-6 box">
          <Utilidades
            :nivel_Agua="nivel_Agua"
            :nivel_Ag_Ref="nivel_Ag_Ref"
            :falha_nivel_Agua="falha_nivel_Agua"
          />
        </div>
        <!-- TEMPERATURA DA CALDEIRA -->
        <div class="p-col-6 box">
          <KtlCaldeira
            :tmp_KTL="tmp_KTL"
            :corTmp_KTL="corTmp_KTL"
            :tmp_Cald="tmp_Cald"
            :corTmp_Cald="corTmp_Cald"
            :corTmp_Fosfato="corTmp_Fosfato"
            :falha_tmp_KTL="falha_tmp_KTL"
            :falha_Cald="falha_Cald"
          />
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
    nivel_Agua: Number,
    nivel_Ag_Ref: Number,
    falha_nivel_Agua: Boolean,
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

<style>
</style>


