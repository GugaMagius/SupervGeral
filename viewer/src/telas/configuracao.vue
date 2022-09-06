<template>
    <div>
        <div class="multiselect">

            <span class="p-float-label" v-if="Object.keys(Variaveis).length >= 0"><br>
                <span for="selVar"> Variável: </span>
                <AutoComplete v-model="varSelecionada" @complete="searchValue($event)" :dropdown="true"
                    :suggestions="variaveisMenu" placeholder="Variável" />

            </span>
        </div>

        <div v-if="Object.keys(Variaveis).includes(varSelecionada)">
            <div v-for="[prop, valor] in Object.entries(listaVariaveis[varSelecionada])" :key="prop">
                <span v-if="prop != 'avisar'">
                    <span>{{ prop }}: </span>
                    <InputText id="input" type="text" v-model="listaVariaveis[varSelecionada][prop]" />
                </span><br>
                <span class="p-float-label" v-if="prop === 'avisar'">

                    <Button label="New" icon="pi pi-plus" class="p-button-success mr-2"
                        @click="novoContato = !novoContato" />
                    <div v-if="novoContato">
                        <table>
                            <td>
                                Nome:
                                <InputText type="text" v-model="avisarTmp['nome']" />

                            </td>
                            <td>
                                SMS:
                                <Checkbox v-model="avisarTmp['sms']" :binary="true" />
                            </td>
                            <td>
                                Telefone:
                                <Checkbox v-model="avisarTmp['telefone']" :binary="true" />
                            </td>
                            <td>
                                E-mail:
                                <Checkbox v-model="avisarTmp['email']" :binary="true" />
                            </td>
                            <td>
                                <Button icon="pi pi-plus" class="p-button-rounded p-button-warning"
                                    @click="salvaContato()" />
                            </td>
                        </table>
                    </div>
                    <div v-for="[index, usuario] in Object.entries(valor)" :key="usuario">

                        <h5>{{ usuario.nome }}: </h5>
                        <InputText type="text" v-model="listaVariaveis[varSelecionada]['avisar'][index]['nome']" />

                        SMS:
                        <Checkbox v-model="listaVariaveis[varSelecionada]['avisar'][index]['sms']" :binary="true" />
                        Telefone:
                        <Checkbox v-model="listaVariaveis[varSelecionada]['avisar'][index]['telefone']"
                            :binary="true" />
                        E-mail:
                        <Checkbox v-model="listaVariaveis[varSelecionada]['avisar'][index]['email']" :binary="true" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
                            @click="apagaContato(index)" />



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
            novoContato: false,
            avisarTmp: {},
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
                    this.variaveisMenu = Object.keys(this.Variaveis);
                }
                else {
                    this.variaveisMenu = Object.keys(this.Variaveis).filter((element) => {
                        return element.includes(event.query.trim());
                    });
                }
            }, 250);
        },
        salvaContato() {
            this.listaVariaveis[this.varSelecionada]['avisar'].push(this.avisarTmp);
            this.novoContato = false;
        },
        apagaContato(index) {
            console.l
            delete this.listaVariaveis[this.varSelecionada]['avisar'][index]
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