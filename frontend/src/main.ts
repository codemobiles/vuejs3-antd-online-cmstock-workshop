import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css"; // or 'ant-design-vue/dist/antd.less'
import Antd from "ant-design-vue";

// createApp(App).mount("#app");

const app = createApp(App);
app.use(Antd);
app.mount("#app");
