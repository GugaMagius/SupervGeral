<template>
    <div>
        <div class="p-fluid grid formgrid" v-if="contatos.Administrador!=undefined">
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
                <tr>
                    <td>
                        <InputText type="text" v-model="contatos['Administrador']['nome']" />
                    </td>
                    <td>
                        <InputText type="text" v-model="contatos['Administrador']['telefone']" />
                    </td>
                    <td>
                        <InputText type="text" v-model="contatos['Administrador']['email']" />
                    </td>
                </tr>
                <tr v-for="nome in Object.keys(contatos)" :key="nome">
                    <td v-if="nome!='Administrador'">
                       {{nome}}
                    </td>
                    <td v-if="nome!='Administrador'">
                        <InputText type="text" v-model="contatos[nome]['telefone']" />
                    </td>
                    <td v-if="nome!='Administrador'">
                        <InputText type="text" v-model="contatos[nome]['email']" />
                    </td>
                    <Button  v-if="nome!='Administrador'" icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="delete contatos[nome]" />
                </tr>
                <tr>
                    <td>
                        <InputText type="text" v-model="nomeNovoContato" />
                    </td>
                    <td>
                        <InputText type="text" v-model="dadosNovoContato['telefone']" />
                    </td>
                    <td>
                        <InputText type="text" v-model="dadosNovoContato['email']" />
                    </td>
                    <Button icon="pi pi-plus" class="p-button-rounded p-button-success" @click="adicionarContato()" />
                </tr>
            </table>
        </div>


        <div class="conexao">
            <Button label="Salvar contatos" icon="pi pi-save" class="p-button-primary" iconPos="left"
                @click="salvarContatos()" /><br><br>
        </div>


    </div>
</template>
<script>


export default {
    name: "contatos",
    props: {
        Contatos: Object
    },
    mounted() {
        setTimeout(()=>{

        this.contatos = this.Contatos

        },200)

    },
    data() {
        return {
            contatos: {},
            nomeNovoContato: '',
            dadosNovoContato: {'telefone': '', 'email': ''}

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
        adicionarContato() {
            if(this.nomeNovoContato!=''){

                this.contatos[this.nomeNovoContato] = this.dadosNovoContato

                this.dadosNovoContato = {'telefone': '', 'email': ''}

                this.nomeNovoContato = ''

            } else {

                alert("Colocar nome para o novo contato")

            }
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