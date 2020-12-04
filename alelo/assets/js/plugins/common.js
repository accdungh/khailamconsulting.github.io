import CommonJs from "../services/common.js";

export default {
  install(Vue, options) {
    Object.defineProperty(Vue.prototype, '$commonJs', {
      get() { return CommonJs() }
    })
  }
}
