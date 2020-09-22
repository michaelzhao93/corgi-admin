<template>
  <el-date-picker
    v-model="pickTime"
    :type="type"
    align="right"
    unlink-panels
    placeholder="请选择日期"
    :picker-options="pickerOptions"
    size="small"
    @change="handlePickerChange"
  />
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'daterange'
    },
    time: {
      type: Date,
      default: new Date()
    }
  },
  data() {
    return {
      pickTime: this.$day(new Date()).subtract(1, 'day').toDate(),
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      }
    }
  },
  methods: {
    handlePickerChange(value) {
      this.$emit('update:time', value)
    }
  }
}
</script>
