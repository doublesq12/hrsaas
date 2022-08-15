import PageTools from '@/components/PageTools'
import UploadExcel from '@/components/UploadExcel'
import UploadImg from '@/components/UploadImg'
const components=[PageTools, UploadExcel,UploadImg]
export default {
  install(Vue) {
    // Vue.component('PageTools',PageTools)
    components.forEach((component) => {
      Vue.component(component.name,component)
    })
  }
}