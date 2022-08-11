import PageTools from '@/components/PageTools'
const components=[PageTools]
export default {
  install(Vue) {
    // Vue.component('PageTools',PageTools)c
    components.forEach((component) => {
      Vue.component(component.name,component)
    })
  }
}