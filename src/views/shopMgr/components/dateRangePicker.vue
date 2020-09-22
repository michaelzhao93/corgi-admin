<template>
  <el-date-picker
    v-model="pickTimeRange"
    :type="type"
    align="right"
    unlink-panels
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :picker-options="pickerOptions"
    size="small"
  />
</template>

<script>
import { pickerOptions } from '@/utils/const'
export default {
  props: {
    type: {
      type: String,
      default: 'daterange'
    },
    timeRange: {
      type: Array,
      default: () => []
    },
    defaultToday: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pickerOptions,
      pickTimeRange: []
    }
  },
  watch: {
    pickTimeRange(value) {
      this.$emit('update:timeRange', value)
    }
  },
  created() {
    if (this.defaultToday) {
      const today = this.$day(new Date()).subtract(1, 'day').toDate()
      this.pickTimeRange = [today, today]
    } else {
      const now = new Date()
      this.pickTimeRange = [this.$day(now).subtract(30, 'day').toDate(), now]
    }
  }
}
</script>
