import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// svg图标
import 'virtual:svg-icons-register'
// pinia
import pinia from "@/store/index.js";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(pinia);

app.mount('#app');
