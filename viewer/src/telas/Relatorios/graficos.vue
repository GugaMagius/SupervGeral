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
        <div class="p-col-3 inline">
          <MultiSelect
            v-model="temperSelecionadas"
            :options="opcoesTemp"
            optionLabel="nome"
            placeholder="Selecione as variáveis"
            display="chip"
          />
        </div>
        <!-- Botão de validação -->
        <div class="p-col-3">
          <Button label="Atualizar" @click="consultaDados" /> <br />
        </div>
      </div>
    </div>
    <div
      class="grafico"
      style="position: relative; height: 80%; width: 95%; padding: 0%"
    >
      <!-- GRÁFICO -->
      <Chart
        type="line"
        ref="graficoTemp"
        height="30"
        width="100"
        :data="basicData"
        :options="options"
      />
    </div>
    <ProgressSpinner
      v-if="aguarde"
      style="
        width: 50px;
        height: 50px;
        position: absolute;
        top: 35vh;
        left: 35vw;
      "
      strokeWidth="6"
      animationDuration=".8s"
    />
    <div>{{ minGraf }}{{ maxGraf }}</div>
  </div>
</template>

<script>
export default {
  mounted: function () {
    this.dataInicio = new Date();
    this.dataFim = new Date();
  },
  data() {
    return {
      dataInicio: "",
      dataFim: "",
      minGraf: "",
      maxGraf: "",
      msg: "",
      aguarde: "",
      coresPenas: [
        "#42A5F5",
        "#7E57C2",
        "#66BB6A",
        "#FFCA28",
        "#AB47BC",
        "#26A69A",
        "#EC407A",
      ],
      temperSelecionadas: [],
      opcoesTemp: [
        { nome: "Velocidade monovia PL", tabela: "velMonoviaPL" },
        { nome: "Velocidade monovia PP", tabela: "velMonoviaPP" },
        { nome: "Temp Queimador 1 PP", tabela: "temperQueim1PP" },
        { nome: "Temp Queimador 2 PP", tabela: "temperQueim2PP" },
        { nome: "Temp Queimador 3 PP", tabela: "temperQueim3PP" },
        { nome: "Temp Queimador 4 PP", tabela: "temperQueim4PP" },
        { nome: "Temp Queimador 1 PL", tabela: "temperQueim1PL" },
        { nome: "Temp Queimador 2 PL", tabela: "temperQueim2PL" },
        {
          nome: "Nível Água Fábrica",
          tabela: "nivel_Agua",
          min: "acima de: 25%",
        },
        {
          nome: "Nível Água Refeitório",
          tabela: "nivel_Ag_Ref",
          min: "acima de: 20%",
        },
        {
          nome: "Entrada Estufa E-coat",
          tabela: "temperEntEstEcoat",
          min: "de 150ºC",
          max: " a 180ºC",
        },
        {
          nome: "Saída Estufa E-coat",
          tabela: "temperSaiEstEcoat",
          min: "de 210ºC",
          max: " a 240ºC",
        },
        {
          nome: "Temperatura KTL",
          tabela: "tmp_KTL",
          min: "de 29ºC",
          max: " a 31ºC",
        },
        {
          nome: "Temperatura Caldeira",
          tabela: "tmp_Cald",
          min: "de 110ºC",
          max: " a 130ºC",
        },
        {
          nome: "Temperatura Ácido 1",
          tabela: "tmp_Acido1",
          min: "de 64ºC",
          max: " a 71ºC",
        },
        {
          nome: "Temperatura Ácido 2",
          tabela: "tmp_Acido2",
          min: "de 64ºC",
          max: " a 71ºC",
        },
        {
          nome: "Temperatura Deseng 1",
          tabela: "tmp_Deseng1",
          min: "de 72ºC",
          max: " a 78ºC",
        },
        {
          nome: "Temperatura Deseng 2",
          tabela: "tmp_Deseng2",
          min: "de 72ºC",
          max: " a 78ºC",
        },
        {
          nome: "Temperatura Fosfato",
          tabela: "tmp_Fosfato",
          min: "de 42ºC",
          max: " a 50ºC",
        },
        { nome: "Carga Queimadores PP", tabela: "QueimadoresPP" },
        { nome: "Carga Queimadores PL", tabela: "QueimadoresPL" },
      ],
      basicData: {
        labels: [],
        datasets: [],
      },
      options: {
        responsive: true,
        hoverMode: "index",
        stacked: false,
        scales: {
          yAxes: [
            {
              type: "linear",
              display: true,
              position: "left",
              id: "y-axis-1",
            },
          ],
        },
      },
    };
  },
  sockets: {
    resConsDB([datas, valores, index, variavel]) {
      if (
        this.basicData.labels.length === datas.length ||
        this.basicData.labels.length === 0 ||
        index === 0
      ) {
        try {
          console.log(
            "Adicionado variavel: ",
            variavel.nome,
            " Index: ",
            index
          );

          this.basicData.datasets.push(
            this.AdicionaVar(variavel.nome, this.coresPenas[index])
          );
        } catch (err) {
          console.log("Erro ao criar variável: ", err);
        } finally {
          //Verifica se existe mais de uma variável no gráfico
          this.basicData.labels = datas;
          this.basicData.datasets[index].data = valores;

          this.$refs.graficoTemp.refresh();

          this.msg = "Dados recebidos e atualizados";
        }
      } else {
        alert(
          "Tamanho dos dados diferente, não foi possível atualizar o gráfico para as variáveis selecionadas. Index: " +
            index +
            " Tamanho dos dados: " +
            this.basicData.labels.length
        );
      }
      this.aguarde = false;
    },
  },
  methods: {
    // Realiza a consulta dos dados no banco de dados e configura as penas do gráfico
    consultaDados() {
      this.aguarde = true;
      this.basicData.labels = []; // Apaga labels atuais
      this.basicData.datasets = []; // Apaga datasets atuais
      this.$refs.graficoTemp.refresh(); // Atualiza gráfico zerado
      for (const [Index, Variaveis] of Object.entries(
        this.temperSelecionadas
      )) {
        console.log("Penas atuais", this.basicData.datasets);
        this.msg =
          "Solicitando atualização dos dados para a Variável: " +
          Variaveis.nome +
          ".....";
        this.$socket.emit("SolicitaDados", [
          Variaveis,
          "*",
          this.convertData(this.dataInicio),
          this.convertData(this.dataFim),
          Index,
          Index.length,
        ]);
        this.minGraf = Variaveis.min;
        this.maxGraf = Variaveis.max;
      }
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

    /*
    AdicionaVar(label, borderColor, data) {
        
            this.label = label;
            this.borderColor = borderColor; //borderColor: "#42A5F5",
            this.data = data; // data: [],
            this.fill = false; // fill: false,
            this.pointRadius = 0; // pointRadius: 0,
    }
*/
    AdicionaVar(label, borderColor, data) {
      return {
        label: label,
        borderColor: borderColor,
        data: data,
        fill: false,
        pointRadius: 0.95,
        borderWidth: 0.7,
      };
    },
  },
};
</script>

<style scoped>
.grafico {
  height: 80px;
  margin-bottom: -5vh;
}

.inline {
  display: inline;
}

.Formulario {
  padding: 1%;
}
</style>