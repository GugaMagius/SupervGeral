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
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-warning p-button-sm"
                            @click="apagaProp(prop)" />
                </span>

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
                        <Dropdown v-model="listaVariaveis[varSelecionada]['avisar'][index]['nome']"
                            :options="Object.keys(Contatos)" placeholder="Selecione um contato" />
                        <!--<InputText type="text" v-model="listaVariaveis[varSelecionada]['avisar'][index]['nome']" />-->

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
            <Button label="Salvar configuração" icon="pi pi-save" class="p-button-primary" iconPos="left"
                @click="salvarConfig()" /><br><br>
        </div>


    </div>
</template>
<script>


export default {
    name: "configuracao",
    props: {
        Variaveis: Object,
        StatusConnect: Object,
        Contatos: Object
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
            variavelTmp: {
                modulo: "",
                endereco: "",
                casasDec: null,
                cor: "",
                escala: 0,  // Valor para escala entre o valor recebido e o valor disponibilizado
                SetPoint: "", // Setpoint de controle da variável
                hist_func: "", // Tamanho da variável de histerese de funcionamento (fora desta faixa indica alerta)
                hist_falha: "", // Tamanho da variável de histerese para Falha (fora desta faixa indica FALHA)
                min2: "", // Valor limite mínimo para indicação de FALHA
                min1: "", // Valor limite mínimo para indicação de ALERTA
                max1: "", // Valor limite máximo para indicação de ALERTA
                max2: "", // Valor limite máximo para indicação de FALHA
                periodoBD: 0,
                flagBD: false,
                condBD: "",
                flagAviso: false,
                borda: false,
                datHraUltDisp: null,
                tmpCondBD: null,
                periodoAq: "0",
                maxBD: 0,
                maxV: 0, // Valor máximo para os valores de leitura (em caso de ultrapassagem deste valor, será apresentado "Max")
                mensagem: "", // Mensagem de falha para aviso por e-mail, telefone, supervisorio
            },
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
                        return element.toLowerCase().includes(event.query.trim().toLowerCase());
                    });
                }
            }, 250);
        },
        salvaContato() {
            this.listaVariaveis[this.varSelecionada]['avisar'].push(this.avisarTmp);
            this.novoContato = false;
        },
        apagaContato(index) {
            delete this.listaVariaveis[this.varSelecionada]['avisar'][index]
        },
        apagaProp(propriedade) {
            console.log("Apagar propriedade: ", propriedade)
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