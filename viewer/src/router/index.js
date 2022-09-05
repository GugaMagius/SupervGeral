import { createWebHistory, createRouter } from "vue-router";
import Ecoat from "@/telas/ecoat.vue";
import Manutencao from "@/telas/manutencao.vue";
import PinturaPo from "@/telas/pinturapo.vue";
import PinturaLiq from "@/telas/pinturaliq.vue";
import Mosaico from "@/telas/mosaico.vue";
import Graficos from "@/telas/Relatorios/graficos.vue";
import Historicos from "@/telas/Relatorios/historicos.vue";
import Rodape from "@/telas/Components/rodape.vue";
import Utilidades from "@/telas/utilidades.vue";
import Erro from "@/telas/FalhaComunic.vue";
import Service from "@/telas/service.vue";
import Configuracao from "@/telas/configuracao.vue";

const routes = [
    {
        path: "/",
        name: "- Geral",
        component: Mosaico,
        props: true
    },
    {
        path: "/graficos",
        name: "- Graficos",
        component: Graficos,
        props: true
    },
    {
        path: "/historicos",
        name: "- Históricos",
        component: Historicos,
        props: true
    },
    {
        path: "/ecoat",
        name: "- Ecoat",
        component: Ecoat,
        props: true
    },
    {
        path: "/manutencao",
        name: "- Manutencao",
        component: Manutencao,
        props: true
    },
    {
        path: "/pinturapo",
        name: "- PinturaPo",
        component: PinturaPo,
        props: true
    },
    {
        path: "/pinturaliq",
        name: "- PinturaLiq",
        component: PinturaLiq,
        props: true
    },
    {
        path: "/rodape",
        name: "- Rodape",
        component: Rodape,
        props: true
    },
    {
        path: "/utilidades",
        name: "- Utilidades",
        component: Utilidades,
        props: true
    },
    {
        path: "/erro",
        name: "Erro",
        component: Erro,
        props: true
    },
    {
        path: "/service",
        name: "Service",
        component: Service,
        props: true
    },
    {
        path: "/configuracao",
        name: "Configuracao",
        component: Configuracao,
        props: true
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;