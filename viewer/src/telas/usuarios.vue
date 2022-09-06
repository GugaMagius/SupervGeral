<template>
    <div>
        <div class="p-fluid grid formgrid" v-if="Contatos.length >= 0">
            <table>
                <tr>
                    <th width="20%">
                        Nome:
                    </th>
                    <th width="20%">
                        Telefone:
                    </th>
                    <th width="60%">
                        E-mail:
                    </th>
                </tr>
                <tr v-for="[index, contato] in Object.entries(contatos)" :key="contato.nome">
                    <td>
                       <InputText type="text" v-model="contatos[index]['nome']" />
                    </td>
                    <td>
                        <InputText type="text" v-model="contatos[index]['telefone']" />
                    </td>
                    <td>
                        <InputText type="text" v-model="contatos[index]['email']" />
                    </td>
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="apagaContato(index)" />
                </tr>
            </table>

        </div>

        <div class="conexao">
            <Button label="Novo Contato" icon="pi pi-plus" class="p-button-success mr-2"
                        @click="contatos.push({nome:'', telefone:'', email:''})" />
            <Button label="Salvar contatos" icon="pi pi-save" class="p-button-primary" iconPos="left"
                @click="salvarContatos()" /><br><br>
        </div>


        <!--
        <div v-if="Object.keys(Variaveis).includes(varSelecionada)">
            <div v-for="[prop, valor] in Object.entries(listaVariaveis[varSelecionada])" :key="prop">
                <span v-if="prop != 'avisar'">
                    <span>{{ prop }}: </span>
                    <InputText id="input" type="text" v-model="listaVariaveis[varSelecionada][prop]" />
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
-->



    </div>
</template>
<script>


export default {
    name: "usuarios",
    props: {
        Contatos: Array
    },
    mounted() {
        this.contatos = this.Contatos

    },
    data() {
        return {
            contatos: []
        }
    },

    methods: {
        salvarContatos() {
            this.$socket.emit("salvaContatos", this.contatos)
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
            delete this.contatos[index]
        }
    },
    sockets: {

        respLog(resp) {
            this.Logs = resp

        },

    }
}

</script>
<style scoped>
.conexao {
    margin: 0.3%;
    padding: 0.3%;
}
</style>