<template>
  <div>
    <el-tag
      v-if="status === 'created'"
      type="info"
      size="mini"
      v-text="parseText(status)"
    />
    <el-tag
      v-else-if="status === 'release'"
      type="success"
      size="mini"
      v-text="parseText(status)"
    />
    <el-tag
      v-else-if="status === 'off'"
      type="warning"
      size="mini"
      v-text="parseText(status)"
    />
    <span v-else v-text="'--'" />
  </div>
</template>

<script>
import { allTopicStatus } from '@/utils/const'
export default {
  props: {
    status: {
      type: String,
      default: ''
    }
  },
  methods: {
    parseText(value) {
      const result = allTopicStatus.find(item => item.value === value)
      return result && result.label || '--'
    }
  }
}
</script>
