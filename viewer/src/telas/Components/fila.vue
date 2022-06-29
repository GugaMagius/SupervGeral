<template>
  <div class="barraFila">
     
    <div id="main">
      <div
        v-if="recB10 > 0"
        id="box10"
        :style="{
          'background-color': corB2,
          color: 'black',
          width: posRecB10 * 0.37 + '%',
        }"
      >
        R:{{ recB10 }} <br />
        <br />{{
          (
            (posRecB9 +
              posRecB8 +
              posRecB7 +
              posRecB6 +
              posRecB5 +
              posRecB4 +
              posRecB3 +
              posRecB2 +
              posRecB1 +
              posRecB0) *
            0.3
          ).toFixed(0)
        }}m
      </div>
      <div
        v-if="recB9 > 0"
        id="box9"
        :style="{
          'background-color': corB1,
          color: 'white',
          width: posRecB9 * 0.37 + '%',
        }"
      >
        R:{{ recB9 }} <br />
        <br />{{
          (
            (posRecB8 +
              posRecB7 +
              posRecB6 +
              posRecB5 +
              posRecB4 +
              posRecB3 +
              posRecB2 +
              posRecB1 +
              posRecB0) *
            0.3
          ).toFixed(0)
        }}m
      </div>
      <div
        v-if="recB8 > 0"
        id="box8"
        :style="{
          'background-color': corB2,
          color: 'black',
          width: posRecB8 * 0.37 + '%',
        }"
      >
        R:{{ recB8 }} <br />
        <br />{{
          (
            (posRecB7 +
              posRecB6 +
              posRecB5 +
              posRecB4 +
              posRecB3 +
              posRecB2 +
              posRecB1 +
              posRecB0) *
            0.3
          ).toFixed(0)
        }}m
      </div>
      <div
        v-if="recB7 > 0"
        id="box7"
        :style="{
          'background-color': corB1,
          color: 'white',
          width: posRecB7 * 0.37 + '%',
        }"
      >
        R:{{ recB7 }} <br />
        <br />{{
          (
            (posRecB6 +
              posRecB5 +
              posRecB4 +
              posRecB3 +
              posRecB2 +
              posRecB1 +
              posRecB0) *
            0.3
          ).toFixed(0)
        }}m
      </div>
      <div
        v-if="recB6 > 0"
        id="box6"
        :style="{
          'background-color': corB2,
          color: 'black',
          width: posRecB6 * 0.37 + '%',
        }"
      >
        R:{{ recB6 }} <br />
        <br />{{
          (
            (posRecB5 + posRecB4 + posRecB3 + posRecB2 + posRecB1 + posRecB0) *
            0.3
          ).toFixed(0)
        }}m
      </div>
      <div
        v-if="recB5 > 0"
        id="box5"
        :style="{
          'background-color': corB1,
          color: 'white',
          width: posRecB5 * 0.37 + '%',
        }"
      >
        R:{{ recB5 }} <br />
        <br />{{
          (
            (posRecB4 + posRecB3 + posRecB2 + posRecB1 + posRecB0) *
            0.3
          ).toFixed(0)
        }}m
      </div>
      <div
        v-if="recB4 > 0"
        id="box4"
        :style="{
          'background-color': corB2,
          color: 'black',
          width: posRecB4 * 0.37 + '%',
        }"
      >
        R:{{ recB4 }} <br />
        <br />{{
          ((posRecB3 + posRecB2 + posRecB1 + posRecB0) * 0.3).toFixed(0)
        }}m
      </div>
      <div
        v-if="recB3 > 0"
        id="box3"
        :style="{
          'background-color': corB1,
          color: 'white',
          width: posRecB3 * 0.37 + '%',
        }"
      >
        R:{{ recB3 }} <br />
        <br />{{ ((posRecB2 + posRecB1 + posRecB0) * 0.3).toFixed(0) }}m
      </div>
      <div
        v-if="recB2 > 0"
        id="box2"
        :style="{
          'background-color': corB2,
          color: 'black',
          width: posRecB2 * 0.37 + '%',
        }"
      >
        R:{{ recB2 }} <br />
        <br />{{ ((posRecB1 + posRecB0) * 0.3).toFixed(0) }}m
      </div>
      <div
        v-if="recB1 > 0"
        id="box1"
        :style="{
          'background-color': corB1,
          color: 'white',
          width: posRecB1 * 0.37 + '%',
        }"
      >
        R:{{ recB1 }} <br />
        <br />{{ (posRecB0 * 0.3).toFixed(0) }}m
      </div>
      <div
        id="box0"
        :style="{
          'background-color': corB0,
          color: 'black',
          width: posRecB0 * 0.37 + '%',
        }"
      >
        R:{{ recEstufaPP }} <br />
      </div>
    </div>
    <br />

  </div>
</template>

<script>
export default {
  data() {
    return {
      qtdPulsosLinha: 273,
      corB0: "lightblue",
      corB1: "#A9A9A9",
      corB2: "#DCDCDC",
      recB1: "",
      recB2: "",
      recB3: "",
      recB4: "",
      recB5: "",
      recB6: "",
      recB7: "",
      recB8: "",
      recB9: "",
      recB10: "",
      posRecB0: "",
      posRecB1: "",
      posRecB2: "",
      posRecB3: "",
      posRecB4: "",
      posRecB5: "",
      posRecB6: "",
      posRecB7: "",
      posRecB8: "",
      posRecB9: "",
      posRecB10: "",
      aPosRec: [],
      aFila: [],
    };
  },
  watch: {
  },

  props: {
    aFilaPP: Array,
    aPosRecPP: Array,
    recEstufaPP: Number,
  },

  methods: {

    atualizaFila: function() {
      
      if (this.aFilaPP[0] !== 0) {
        this.posRecB0 = this.aPosRecPP[0];
      } else {
        this.posRecB0 = this.qtdPulsosLinha;
      }
      if (this.aFilaPP[1] > 0) {
        this.posRecB1 = this.aPosRecPP[1] - this.aPosRecPP[0];
      } else if (this.recB1 === 0) {
        this.posRecB2 = 0;
      } else {
        this.posRecB1 = this.qtdPulsosLinha - this.aPosRecPP[0];
      }
      if (this.aFilaPP[2] > 0) {
        this.posRecB2 = this.aPosRecPP[2] - this.aPosRecPP[1];
      } else if (this.recB2 === 0) {
        this.posRecB3 = 0;
      } else {
        this.posRecB2 = this.qtdPulsosLinha - this.aPosRecPP[1];
      }
      if (this.aFilaPP[3] > 0) {
        this.posRecB3 = this.aPosRecPP[3] - this.aPosRecPP[2];
      } else if (this.recB3 === 0) {
        this.posRecB4 = 0;
      } else {
        this.posRecB3 = this.qtdPulsosLinha - this.aPosRecPP[2];
      }
      if (this.aFilaPP[4] > 0) {
        this.posRecB4 = this.aPosRecPP[4] - this.aPosRecPP[3];
      } else if (this.recB4 === 0) {
        this.posRecB5 = 0;
      } else {
        this.posRecB4 = this.qtdPulsosLinha - this.aPosRecPP[3];
      }
      if (this.aFilaPP[5] > 0) {
        this.posRecB5 = this.aPosRecPP[5] - this.aPosRecPP[4];
      } else if (this.recB5 === 0) {
        this.posRecB6 = 0;
      } else {
        this.posRecB5 = this.qtdPulsosLinha - this.aPosRecPP[4];
      }
      if (this.aFilaPP[6] > 0) {
        this.posRecB6 = this.aPosRecPP[6] - this.aPosRecPP[5];
      } else if (this.recB6 === 0) {
        this.posRecB7 = 0;
      } else {
        this.posRecB6 = this.qtdPulsosLinha - this.aPosRecPP[5];
      }
      if (this.aFilaPP[7] > 0) {
        this.posRecB7 = this.aPosRecPP[7] - this.aPosRecPP[6];
      } else if (this.recB7 === 0) {
        this.posRecB8 = 0;
      } else {
        this.posRecB7 = this.qtdPulsosLinha - this.aPosRecPP[6];
      }
      if (this.aFilaPP[8] > 0) {
        this.posRecB8 = this.aPosRecPP[8] - this.aPosRecPP[7];
      } else if (this.recB8 === 0) {
        this.posRecB9 = 0;
      } else {
        this.posRecB8 = this.qtdPulsosLinha - this.aPosRecPP[7];
      }
      if (this.aFilaPP[9] > 0) {
        this.posRecB9 = this.aPosRecPP[9] - this.aPosRecPP[8];
      } else if (this.recB9 === 0) {
        this.posRecB10 = 0;
      } else {
        this.posRecB9 = this.qtdPulsosLinha - this.aPosRecPP[8];
      }
      (this.recB1 = this.aFilaPP[0]),
        (this.recB2 = this.aFilaPP[1]),
        (this.recB3 = this.aFilaPP[2]),
        (this.recB4 = this.aFilaPP[3]),
        (this.recB5 = this.aFilaPP[4]),
        (this.recB6 = this.aFilaPP[5]),
        (this.recB7 = this.aFilaPP[6]),
        (this.recB8 = this.aFilaPP[7]),
        (this.recB9 = this.aFilaPP[8]);
      this.recB10 = this.aFilaPP[9];
    }
  },
};
</script>

<style>
#box0 {
  height: 100%;
}
.barraFila {
  width: 100%;
}

#main {
  width: 95%;
  height: auto;
  border: 1px solid #c3c3c3;
  display: -webkit-flex; /* Safari */
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  margin-right: auto;
}

#main div {
  width: 10%;
  min-width: 2%;
  height: 70px;
  margin-right: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>