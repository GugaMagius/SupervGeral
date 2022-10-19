import {createApp} from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import VueRouter from 'vue-router';
import router from './router'

//import 'primevue/resources/themes/saga-blue/theme.css'; //theme
import 'primevue/resources/themes/vela-blue/theme.css';
import 'primevue/resources/primevue.min.css'; //core css
import 'primeicons/primeicons.css';  //icons

import 'primeflex/primeflex.css';

import Chart from 'primevue/chart';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Panel from 'primevue/panel';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Knob from 'primevue/knob';
import Slider from 'primevue/slider';
import Badge from 'primevue/badge';
import InputNumber from 'primevue/inputnumber'
import Menu from 'primevue/menu';
import Calendar from 'primevue/calendar';
import MultiSelect from 'primevue/multiselect';
import ProgressSpinner from 'primevue/progressspinner';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup'; 
import Dropdown from 'primevue/dropdown';
import ProgressBar from 'primevue/progressbar';
import AutoComplete from 'primevue/autocomplete';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';



const SocketInstance  = {
    debug: true,
    connection: SocketIO('http://desenvolvimento:3004') //#Teste ('http://192.168.22.188:3004')   // teste! ('http://10.69.0.6:3004')  //('http://10.41.1.180:3004') //colocar IP do servidor se o viewer não rodar no mesmo pc
    //connection: SocketIO('http://10.41.1.114:3004')
  }

const app = createApp(App).use(new VueSocketIO(SocketInstance));

app.use(PrimeVue);
app.use(VueRouter);
app.use(router);

app.component('Chart', Chart);
app.component('Button', Button);
app.component('Card', Card);
app.component('Panel', Panel);
app.component('Splitter', Splitter);
app.component('SplitterPanel', SplitterPanel);
app.component('Knob', Knob);
app.component('Slider', Slider);
app.component('Badge', Badge);
app.component('InputNumber', InputNumber);
app.component('Menu', Menu);
app.component('Calendar', Calendar);
app.component('MultiSelect', MultiSelect);
app.component('ProgressSpinner', ProgressSpinner);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Dropdown', Dropdown);
app.component('ProgressBar', ProgressBar);
app.component('AutoComplete', AutoComplete);
app.component('InputText', InputText);
app.component('Checkbox', Checkbox)



app.mount('#app');
