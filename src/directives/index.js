import store from '@/store'
export const imgError = {
  inserted: function (el, { value }) {
    if (!el.src) {
  el.src=value
    } else {
      el.onerror = function(){
        el.src=value
      }  
    }
  },
  update(el, { value }) {
    if (!el.src) {
      el.src=value
        }
  },
 
}
export const isHas = {
  inserted(el, binding) {
    // console.log(el);
    console.log(binding);
    const has = store.state.permission.points.includes(binding.value)
    console.log(has);
    if (!has) {
      el.remove()
    }
  }
}