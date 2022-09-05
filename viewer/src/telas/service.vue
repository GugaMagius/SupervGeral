<template>
    <div>
        <div class="conexao">
            CLP E-coat:
            <Button label="Conectar" icon="pi pi-check" class="p-button-success" iconPos="left"
                @click="conectar('ecoat')" />
            <Button label="Desconectar" icon="pi pi-power-off" class="p-button-danger" iconPos="left"
                @click="desconectar('ecoat')" />
            <span> {{ StatusConnect.ecoat ? "Conectado" : "Desconectado" }} </span>
        </div>
        <div class="conexao">
            CLP Pintura pó:
            <Button label="Conectar" icon="pi pi-check" class="p-button-success" iconPos="left"
                @click="conectar('pinturapo')" />
            <Button label="Desconectar" icon="pi pi-power-off" class="p-button-danger" iconPos="left"
                @click="desconectar('pinturapo')" />
            <span> {{ StatusConnect.pinturapo ? "Conectado" : "Desconectado" }} </span>
        </div>
        <div class="conexao">
            Módulo Modbus Auditório:
            <Button label="Conectar" icon="pi pi-check" class="p-button-success" iconPos="left"
                @click="conectar('auditorio')" />
            <Button label="Desconectar" icon="pi pi-power-off" class="p-button-danger" iconPos="left"
                @click="desconectar('auditorio')" />
            <span> {{ StatusConnect.auditorio ? "Conectado" : "Desconectado" }} </span>

        </div>
        <div class="conexao">
            Log de falhas:
            <Button label="Atualizar Log" icon="pi pi-exclamation-triangle" class="p-button-primary" iconPos="left"
                @click="log()" /><br><br>
                <li v-for="log in Logs" :key="Object.keys(log)">{{log.DataHora}} - {{log.Mensagem}}</li>
        </div>



    </div>
</template>
<script>
export default {
    name: "service",
    props: {
        Variaveis: Object,
        StatusConnect: Object,
    },
    data() {
        return {
            Logs: {}

        }
    },
    methods: {
        desconectar(modulo) {
            this.$socket.emit("desconectar", modulo)
        },
        conectar(modulo) {
            this.$socket.emit("conectar", modulo)
        },
        log() {
            this.$socket.emit("consultaLog")
        }
    },
    sockets: {

        respLog(resp) {
            this.Logs = resp

        }

    }
}

</script>
<style scoped>

    .conexao{
        margin: 0.3%;
        padding: 0.3%;
    }
</style>