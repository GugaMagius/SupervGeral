<template>
  <div>
    <div class="flexgrid-demo p-p-2">
      <div class="p-grid">
        <!-- Data inicial -->
        <div class="p-col-6 inline">
          <label for="dataInicial"> Data Inicial: </label>
          <Calendar
            id="dataInicial"
            v-model="dataInicio"
            :showTime="true"
            :showSeconds="true"
            dateFormat="dd/mm/yy"
            :monthNavigator="true"
            :yearNavigator="true"
            :showButtonBar="true"
            autocomplete="off"
          />
          <!-- Data final -->
          <label for="dataFinal"> Data Final: </label>
          <Calendar
            id="dataFinal"
            v-model="dataFim"
            :showTime="true"
            :showSeconds="true"
            dateFormat="dd/mm/yy"
            :monthNavigator="true"
            :yearNavigator="true"
            :showButtonBar="true"
            autocomplete="off"
          />
        </div>
        <!-- Seleção das Variáveis -->
        <div class="p-col-3">
          <Dropdown
            v-model="varDVselecionado"
            :options="opcoesDV"
            optionLabel="nome"
            placeholder="Selecione as variáveis"
          />
        </div>
        <!-- Botão de validação -->
        <div class="p-col-3">
          <Button label="Atualizar" @click="consultaDados" /> <br />
        </div>
      </div>
    </div>
    <div>
      <!-- DATA VIEW -->
      <DataTable :value="valores" stripedRows responsiveLayout="scroll">
        <Column
          field="data"
          :sortable="true"
          header="Data"
          headerStyle="text-align: center"
        >
          <template #body="slotProps">
            {{
              new Date(slotProps.data.data).toLocaleString("en-GB", {
                timeZone: "UTC",
              })
            }}
          </template>
        </Column>
        <Column
          field="valor"
          :sortable="true"
          header="Valor"
          headerStyle="text-align: center"
        ></Column>
      </DataTable>
    </div>
    <div>
      <br />
      <ProgressSpinner
        v-if="aguarde"
        style="width: 50px; height: 50px"
        strokeWidth="6"
        animationDuration=".8s"
      />
      <p>{{ msg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  sockets: {
    resConsDBdv(dados) {
      this.valores = dados;
      this.aguarde = false;
      this.msg = "Dados atualizados";
    },
  },
  mounted: function () {
    this.dataInicio = new Date();
    this.dataFim = new Date();
  },
  methods: {
    // Realiza a consulta dos dados no banco de dados e configura as penas do gráfico
    consultaDados() {
      this.aguarde = true;

      this.msg =
        "Solicitando atualização dos dados para a Variável: " +
        this.varDVselecionado.nome +
        ".....";
      this.$socket.emit("SolicitaDadosDV", [
        this.varDVselecionado,
        "*",
        this.convertData(this.dataInicio),
        this.convertData(this.dataFim),
      ]);
    },

    // Converte a data recebida para o formado do Banco de Dados
    convertData(data) {
      //console.log("DATA RECEBIDA",data.getYear())
      let ano = data.getYear() + 1900;
      let mes = (data.getMonth() + 1).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      let dia = data.getDate().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      let hora = data.getHours().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      let minuto = data.getMinutes().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      return (
        "'" + ano + "-" + mes + "-" + dia + " " + hora + ":" + minuto + "'"
      );
    },

    AdicionaVar(label, borderColor, data) {
      return {
        label: label,
        borderColor: borderColor,
        data: data,
        fill: false,
        pointRadius: 0.7,
        borderWidth: 0.5,
      };
    },
  },
  data() {
    return {
      dataInicio: "",
      dataFim: "",
      msg: "",
      aguarde: "",
      varDVselecionado: "",
      valores: [],
      opcoesDV: [
        { nome: "Receita Estufa PP", tabela: "recEstufaPP" },
        { nome: "Receita Estufa PL", tabela: "recEstufaPL" },
        { nome: "Status Monovia PL", tabela: "stsMonoviaPL" },
        { nome: "Status Monovia PP", tabela: "stsMonoviaPP" },
        { nome: "SetPoint Queimador 1 PP", tabela: "spQueim1PP" },
        { nome: "SetPoint Queimador 2 PP", tabela: "spQueim2PP" },
        { nome: "SetPoint Queimador 3 PP", tabela: "spQueim3PP" },
        { nome: "SetPoint Queimador 4 PP", tabela: "spQueim4PP" },
        { nome: "SetPoint Queimador 1 PL", tabela: "spQueim1PL" },
        { nome: "SetPoint Queimador 2 PL", tabela: "spQueim2PL" },
        { nome: "Status Queimador 1 PL", tabela: "leitQuem1PL" },
        { nome: "Status Queimador 2 PL", tabela: "leitQuem2PL" },
        { nome: "Status Queimador 1 PP", tabela: "leitQuem1PP" },
        { nome: "Status Queimador 2 PP", tabela: "leitQuem2PP" },
        { nome: "Status Queimador 3 PP", tabela: "leitQuem3PP" },
        { nome: "Status Queimador 4 PP", tabela: "leitQuem4PP" },
        { nome: "Falha Queimador 1 PL", tabela: "falhaQuem1PL" },
        { nome: "Falha Queimador 2 PL", tabela: "falhaQuem2PL" },
        { nome: "Falha Queimador 1 PP", tabela: "falhaQuem1PP" },
        { nome: "Falha Queimador 2 PP", tabela: "falhaQuem2PP" },
        { nome: "Falha Queimador 3 PP", tabela: "falhaQuem3PP" },
        { nome: "Falha Queimador 4 PP", tabela: "falhaQuem4PP" },
        { nome: "Falha Ventilador 1 PL", tabela: "falhaVent1PL" },
        { nome: "Falha Ventilador 2 PL", tabela: "falhaVent2PL" },
        { nome: "Falha Ventilador 1 PP", tabela: "falhaVent1PP" },
        { nome: "Falha Ventilador 2 PP", tabela: "falhaVent2PP" },
        { nome: "Falha Ventilador 3 PP", tabela: "falhaVent3PP" },
        { nome: "Falha Ventilador 4 PP", tabela: "falhaVent4PP" },
        { nome: "Falha Temperatura 1 PL", tabela: "falhaTemp1PP" },
        { nome: "Falha Temperatura 2 PL", tabela: "falhaTemp2PP" },
        { nome: "Falha Temperatura 1 PP", tabela: "falhaTemp3PP" },
        { nome: "Falha Temperatura 2 PP", tabela: "falhaTemp4PP" },
        { nome: "Falha Temperatura 3 PP", tabela: "falhaTemp1PL" },
        { nome: "Falha Temperatura 4 PP", tabela: "falhaTemp2PL" },
        { nome: "Chama Baixa Queim 1 PP", tabela: "Queim1PPchmBx" },
        { nome: "Chama Alta Queim 1 PP", tabela: "Queim1PPchmAt" },
        { nome: "Chama Baixa Queim 2 PP", tabela: "Queim2PPchmBx" },
        { nome: "Chama Alta Queim 2 PP", tabela: "Queim2PPchmAt" },
        { nome: "Chama Baixa Queim 3 PP", tabela: "Queim3PPchmBx" },
        { nome: "Chama Alta Queim 3 PP", tabela: "Queim3PPchmAt" },
        { nome: "Chama Baixa Queim 4 PP", tabela: "Queim4PPchmBx" },
        { nome: "Chama Alta Queim 4 PP", tabela: "Queim4PPchmAt" },
        { nome: "Chama Baixa Queim 1 PL", tabela: "Queim1PLchmBx" },
        { nome: "Chama Alta Queim 1 PL", tabela: "Queim1PLchmAt" },
        { nome: "Chama Baixa Queim 2 PL", tabela: "Queim2PLchmBx" },
        { nome: "Chama Alta Queim 2 PL", tabela: "Queim2PLchmAt" },
        { nome: "Velocidade monovia PL", tabela: "velMonoviaPL" },
        { nome: "Velocidade monovia PP", tabela: "velMonoviaPP" },
        { nome: "Temp Queimador 1 PP", tabela: "temperQueim1PP" },
        { nome: "Temp Queimador 2 PP", tabela: "temperQueim2PP" },
        { nome: "Temp Queimador 3 PP", tabela: "temperQueim3PP" },
        { nome: "Temp Queimador 4 PP", tabela: "temperQueim4PP" },
        { nome: "Temp Queimador 1 PL", tabela: "temperQueim1PL" },
        { nome: "Temp Queimador 2 PL", tabela: "temperQueim2PL" },
        { nome: "Carga Queimadores PP", tabela: "QueimadoresPP" },
        { nome: "Carga Queimadores PL", tabela: "QueimadoresPL" },
        { nome: "Ciclo Ecoat", tabela: "cicloEcoat" },
        { nome: "Falha Crítica", tabela: "falha_Critica" },
        { nome: "Falha Temperatura Caldeira", tabela: "falha_Cald" },
        { nome: "Falha Temperatura KTL", tabela: "falha_tmp_KTL" },
        { nome: "Falha Retificador E-coat", tabela: "falhaRetific" },
        { nome: "Falha Temperatura Ácido 1", tabela: "falha_Acido1" },
        { nome: "Falha Temperatura Ácido 2", tabela: "falha_Acido2" },
        { nome: "Falha Temperatura Deseng 1", tabela: "falha_Desg1" },
        { nome: "Falha Temperatura Deseng 2", tabela: "falha_Desg2" },
        { nome: "Falha Temperatura Fosfato", tabela: "falha_Fosf" },
        { nome: "Falha Temper Entr Estufa", tabela: "falha_TmpEntEst" },
        { nome: "Falha Temper Sai Estufa", tabela: "falha_TmpSaiEst" },
        { nome: "Falha Modulos I/O E-coat", tabela: "falha_IO" },
        { nome: "Falha Temper Painel Geral", tabela: "falha_TmpPnlGer" },
        { nome: "Falha Temper Painel Oper", tabela: "falha_TmpPnlOp" },
        { nome: "Falha Temper Painel Retif", tabela: "falha_TmpPnlRet" },
        { nome: "Falha Vent Estuf E-coat", tabela: "falha_VntEstEcoat" },
        { nome: "Falha Queim Entr Estufa", tabela: "falha_QmdEntEst" },
        { nome: "Falha Queim Sai Estufa", tabela: "falha_QmdSaiEst" },
        { nome: "Falha Temperatura Caldeira", tabela: "falha_Cald" },
        { nome: "Falha Nível de Água", tabela: "falha_nivel_Agua" },
        { nome: "Nível Água Fábrica", tabela: "nivel_Agua" },
        { nome: "Nível Água Refeitório", tabela: "nivel_Ag_Ref" },
        { nome: "Entrada Estufa E-coat", tabela: "temperEntEstEcoat" },
        { nome: "Saída Estufa E-coat", tabela: "temperSaiEstEcoat" },
        { nome: "Temperatura KTL", tabela: "tmp_KTL" },
        { nome: "Temperatura Caldeira", tabela: "tmp_Cald" },
        { nome: "Temperatura Ácido 1", tabela: "tmp_Acido1" },
        { nome: "Temperatura Ácido 2", tabela: "tmp_Acido2" },
        { nome: "Temperatura Deseng 1", tabela: "tmp_Deseng1" },
        { nome: "Temperatura Deseng 2", tabela: "tmp_Deseng2" },
        { nome: "Temperatura Fosfato", tabela: "tmp_Fosfato" },
      ],
    };
  },
};
</script>

<style scoped>
.Formulario {
  padding: 1%;
}
</style>