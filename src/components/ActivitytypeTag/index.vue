<template>
  <div>
    <el-tag
      v-if="type === '待审核'"
      type="warning"
      size="mini"
      v-text="type"
    />
    <el-tag
      v-else-if="type === '违规'"
      type="danger"
      size="mini"
      v-text="type"
    />
    <el-tag
      v-else
      size="mini"
      v-text="type || '--'"
    />
  </div>
</template>

<script>
import { allCensorshipTypes } from '@/utils/const'
export default {
  props: {
    type: {
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
