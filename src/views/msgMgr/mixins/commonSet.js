export const emit = {
  methods: {
    acceptEmitData(params) {
      params.prop.reduce((data, prop, index) => {
        if (index === (params.prop.length - 1)) {
          data[prop] = params.value
          return
        }
        return data[prop]
      }, this)
    },
    acceptEmitFunc(params) {
      this[params.function](params.arguments)
    }
  }
}

export const getBreadList = {
  data() {
    return {
      breadList: []
    }
  },
  watch: {
    $route() {
      this.getBreadList()
    }
  },
  created() {
    this.getBreadList()
  },
  methods: {
    getBreadList() {
      this.breadList = this.$route.matched.filter(({ meta: { breadTitle }}) => breadTitle).map(({ meta: { breadTitle }, path }) => ({ breadTitle, path }))
    }
  }
}

export const searchCommon = {
  data() {
    return {
      searchRef: 'mainSearch'
    }
  },
  beforeDestroy() {
    this.resetForm('mainSearch')
  },
  methods: {
    resetForm(formName)
{
 if (this.$refs[formName]!==undefined) {
     this.$refs[formName].resetFields();
 }
}
  }
}

import { allCensorshipTypes, checkBadgeType } from '@/utils/const'
export const parseImageStatus = {
  methods: {
    parseImageStatusText(status) {
      const parsed = allCensorshipTypes.find(item => status === item.value)
      return parsed ? parsed.label : '--'
    },
    parseImageStatusType(status) {
      const parsed = allCensorshipTypes.find(item => status === item.value)
      const type = parsed ? checkBadgeType.find(item => parsed.value === item.value) : ''
      return type ? type.type : ''
    }
  }
}

export const visible = {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false
    }
  },
  watch: {
    show(value) {
      !value && this.$emit('update:visible', value)
    },
    visible(value) {
      this.show = !!value
    }
  },
  methods: {
    handleDialogClose() {
      this.show = false
    }
  }
}
