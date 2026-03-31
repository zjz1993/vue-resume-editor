import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import { piniaPersistPlugin } from '@/store/plugins/persistSave.ts'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const pinia = createPinia()
pinia.use(piniaPersistPlugin)
app.use(pinia)

app.use(ElementPlus, {
  locale: zhCn
})
app.mount('#app')
