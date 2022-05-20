import { createApp } from "vue";

import App from "./App";
import components from "@/components/UI";
import directives from "@/directives";
import store from "@/store";
import router from "@/router/router";

const app = createApp(App);

components.forEach((comp) => app.component(comp.name, comp));

directives.forEach((directive) => app.directive(directive.name, directive));

app
.use(store)
.use(router)
.mount("#app");
