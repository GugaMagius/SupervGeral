<template>
    <div>
        <table>
            <tr>
                <th>Módulo</th>
                <th>Arquivo</th>
                <th>Endereço</th>
                <th>Valor Atual</th>
                <th>Novo Valor</th>
            </tr>

            <tr>
                <td>
                    <InputText v-model="variavel['Modulo']" placeholder="Módulo" />
                </td>
                <td>
                    <InputText v-model="variavel['Arquivo']" placeholder="Arquivo" />
                </td>
                <td>
                    <InputText v-model="variavel['Endereco']" placeholder="Endereço" />
                </td>
                <td>
                    <InputText v-model="variavel['ValorAtual']" placeholder="Valor Atual" />
                </td>
                <td>
                    <InputText v-model="variavel['ValorNovo']" placeholder="Novo Valor" />
                </td>
                <td>
                    <Button icon="pi pi-upload" class="p-button-rounded p-button-info p-button-sm" label="Ler"
                        @click="leitura(variavel)" />
                </td>
                <td>
                    <Button icon="pi pi-down" class="p-button-rounded p-button-warning p-button-sm" label="Gravar"
                        @click="grava(variavel)" />
                </td>
            </tr>

        </table>

    </div>
</template>
<script>


export default {
    name: "variaveis",
    data() {
        return {
            variavel: {
                Modulo: '',
                Arquivo: '',
                Endereco: '',
                ValorAtual: '',
                ValorNovo: '',
                TmpAtualiz: 5,
            },
            interval: null,

        }
    },

    methods: {
        grava(variavel) {

            this.$socket.emit('gravaVariavIndiv', variavel)

        },

        leitura(variavel) {

            this.$socket.emit('lerVariavIndiv', variavel)

        },

    },

    mounted() {
    },

    sockets: {

        variavelIndv(parametros) {
            this.variavel = parametros;
        }

    }

}

</script>
<style scoped>

</style>