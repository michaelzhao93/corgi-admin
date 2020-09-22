<template>
  <div>
    <el-tag
      v-if="status === 'created'"
      type="success"
      size="mini"
      v-text="parseText(status)"
    />
    <el-tag
      v-else-if="status === 'full'"
      type="warning"
      size="mini"
      v-text="parseText(status)"
    />
    <el-tag
      v-else-if="status === 'ended'"
      type="info"
      size="mini"
      v-text="parseText(status)"
    />
    <el-tag
      v-else-if="status === 'deleted'"
      type="danger"
      size="mini"
      v-text="parseText(status)"
    />
    <span v-else v-text="'--'" />
  </div>
</template>

<script>
import { allActivityStatus } from '@/utils/const'
export default {
  props: {
    status: {
      type: String,
      default: ''
    }
  },
  methods: {
    parseText(value) {
      const result = allActivityStatus.find(item => item.value === value)
      return result && result.label || '--'
    }
  }
}
</script>
