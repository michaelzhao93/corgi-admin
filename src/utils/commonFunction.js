const common = {
  deepCopy(target) {
    let result
    if (typeof target === 'object') {
      if (Array.isArray(target)) {
        result = []
        for (const i in target) {
          result.push(this.deepCopy(target[i]))
        }
      } else if (target === null) {
        result = null
      } else if (target.constructor === RegExp) {
        result = target
      } else {
        result = {}
        for (const i in target) {
          result[i] = this.deepCopy(target[i])
        }
      }
    } else {
      result = target
    }
    return result
  },
  createDom(h, params) {
    return params.map(item => {
      const func = []
      func.push(item.elName)
      func.push(item.props)
      if (item.children) func.push([this.createDom(h, item.children)])
      return h(...func)
    })
  },
  checkFormValid: (vue, formName = 'mainForm') => {
    let result
    vue.$refs[formName].validate(valid => { result = valid })
    return result
  },
  isArrayNumEqual(source, target) {
    if (!Array.isArray(source)) {
      return new Error('source is not Array')
    }
    if (!Array.isArray(target)) {
      return new Error('target is not Array')
    }
    source = source.sort()
    target = target.sort()
    return source.every((item, index) => item === target[index])
  }
}
export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$common', {
      value: common
    })
  }
}

