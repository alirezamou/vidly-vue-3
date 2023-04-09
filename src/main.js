import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faChevronUp,
  faChevronDown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

library.add(faChevronDown, faChevronUp, faPlus);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";

const app = createApp(App);

app.component("fa-icon", FontAwesomeIcon);

app.use(router);

app.use(store);

app.mount("#app");
