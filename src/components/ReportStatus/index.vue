<template>
  <div>
    <el-tag
      v-if="status === 'reported'"
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
      v-else-if="status === 'checked'"
      type="danger"
      size="mini"
      v-text="parseText(status)"
    />
    <span v-else v-text="'--'" />
  </div>
</template>

<script>
import { allReportStatus } from '@/utils/const'
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
      const result = allReportStatus.find(item => item.value === value)
      return result && result.label || '--'
    }
  }
}
</script>
