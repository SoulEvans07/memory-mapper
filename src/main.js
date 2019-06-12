import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

function range(start, end) {
  if(start === end) return [start];
  return [start, ...range(start + 1, end)];
}