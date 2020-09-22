<template>
  <div>
    <el-tag
      v-if="status === 'pass' || status === null"
      type="success"
      size="mini"
      v-text="parseText(status)"
    />
    <el-tag
      v-else-if="status === 'check'"
      type="warning"
      size="mini"
      v-text="parseText(status)"
    />
    <el-tag
      v-else-if="status === 'fail'"
      type="danger"
      size="mini"
      v-text="parseText(status)"
    />
           <el-tag
      v-else-if="status === 'no_face'"
      type="danger"
      size="mini"
      v-text="parseText(status)"
    />
    <span v-else v-text="'--'" />
  </div>
</template>

<script>
import { allActivityCheckStatus } from '@/utils/const'
export default {
  props: {
    status: {
      type: String,
      default: ''
    }
  },
  methods: {
    parseText(value) {
      if (value === null) {
        value = 'pass'
      }
      const result = allActivityCheckStatus.find(item => item.value === value)
      return result && result.label || '--'
    }
  }
}
</script>
