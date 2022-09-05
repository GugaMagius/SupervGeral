<template>
    <div>
        <div class="multiselect">
            {{ listaVariaveis[varSelecionada] }}

            <span class="p-float-label" v-if="Object.keys(Variaveis).length >= 0">
                <AutoComplete v-model="varSelecionada" :dropdown="true" :suggestions="variaveisMenu"
                    @complete="searchValue($event)" placeholder="Variável" />
                <label for="selVar"> Centro de Custo: </label>

            </span>
        </div>

        <div v-if="varSelecionada.length > 1">
            <div v-for="[prop] in Object.entries(listaVariaveis[varSelecionada])" :key="prop">
                <span class="p-float-label" v-if="prop != 'avisar'">
                    <h5>{{prop}}</h5>
                    <InputText id="input" type="text" v-model="listaVariaveis[varSelecionada][prop]" />
                </span>
                <span class="p-float-label" v-if="prop === 'avisar'">
                    <div v-for="propAvisar in prop" :key="propAvisar">
                    <h5>{{propAvisar}}</h5>
                        <InputText id="inputAvisar" type="text" v-model="listaVariaveis[varSelecionada]['avisar'][propAvisar]" />
                    </div>
                </span>
            </div>
        </div>


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
            <Button label="Salvar configuração" icon="pi pi-exclamation-triangle" class="p-button-primary"
                iconPos="left" @click="salvarConfig()" /><br><br>
            <li v-for="Variavel in Variaveis" :key="Object.keys(Variavel)">{{ Object.keys(Variavel) }}</li>
        </div>



    </div>
</template>
<script>


export default {
    name: "configuracao",
    props: {
        Variaveis: Object,
        StatusConnect: Object,
    },
    mounted() {
        this.listaVariaveis = this.Variaveis
        this.variaveisMenu = Object.keys(this.listaVariaveis)

    },
    data() {
        return {
            listaVariaveis: {},
            variaveisMenu: [],
            varSelecionada: [],
            Logs: {}


        }
    },
    methods: {
        salvarConfig() {
            this.$socket.emit("salvaConfig", this.Variaveis)
        },
        searchValue(event) {
            console.log(event)
            setTimeout(() => {
                if (!event.query.trim().length) {
                    this.variaveisMenu = [...Object.keys(this.Variaveis)];
                }
                else {
                    this.variaveisMenu = Object.keys(this.Variaveis).filter((element) => {
                        return element.includes(event.query);
                    });
                }
            }, 450);
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
.conexao {
    margin: 0.3%;
    padding: 0.3%;
}
</style>