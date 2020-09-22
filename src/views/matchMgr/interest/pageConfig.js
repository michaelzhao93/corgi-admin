import day from 'dayjs'
const now = new Date()
const dateRange = [day(now).subtract(30, 'day').toDate(), now]
export default {
  searchForm: {
    dateRange,
    stayCount: 30
  },
  formRules: {
    'dateRange': { required: true, message: '请选择日期', trigger: 'blur' },
    'stayCount': { required: true, message: '请输入停留天数', trigger: 'blur' }
  }
}
