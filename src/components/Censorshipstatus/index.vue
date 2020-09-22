<template>
  <div>
    <el-tag
      v-if="status === 'check'"
      type="warning"
      size="mini"
      v-text="parseText(status)"
    />
    <el-tag
      v-else-if="status === 'normal'"
      type="success"
      size="mini"
      v-text="parseText(status)"
    />
    <el-tag
      v-else-if="status === 'failed'"
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
import { allCensorshipTypes } from '@/utils/const'
export default {
  props: {
    status: {
      type: String,
      default: ''
    }
  },
  methods: {
    parseText(value) {
      const result = allCensorshipTypes.find(item => item.value === value)
      return result && result.label || '--'
    }
  }
}
</script>
