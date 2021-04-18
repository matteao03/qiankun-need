import './public-path';
import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

//模拟生产环境
import VueI18n from 'vue-i18n'
import * as echarts from 'echarts'
import mqtt from 'mqtt'
import Stomp from 'stompjs'
import VueMap from 'vue-map'
import AMap from 'vue-amap'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'

Vue.use(VueVideoPlayer, {})
Vue.use(AMap)
Vue.use(VueMap)
Vue.use(VueI18n)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

let instance = null;
function render(props = {}) {
  let container = props.container
  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#subapp') : '#subapp');
}

export async function bootstrap() {
  console.log("***************微应用 - bootstrap***************", app);
  console.log(new Date().getTime())
}
export async function mount(props) {
  render(props);
  console.log("***************微应用 - mount***************", app);
  console.log(new Date().getTime())
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}