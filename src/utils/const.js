export const LABEL_WIDTH_100 = '100px'

export const LABEL_WIDTH_150 = '150px'

export const paginationSetDefault = {
  size: [10, 30, 50, 100, 300, 500],
  layout: 'total, sizes, prev, pager, next, jumper'
}

export const allCheckStatus = [
  { label: '全部', value: '' },
  { label: '通过', value: 'pass' },
  { label: '自动审核未通过', value: 'check' }
]

export const allActivityCheckStatus = [
  { label: '全部', value: '' },
  { label: '通过', value: 'pass' },
  { label: '自动审核未通过', value: 'check' },
  { label: '审核未通过', value: 'fail' }
]

export const allActivityStatus = [
  { label: '进行中', value: 'created' },
  { label: '已满员', value: 'full' },
  { label: '已结束', value: 'ended' },
  { label: '已删除', value: 'deleted' }
]

export const allCensorshipTypes = [
  { label: '全部', value: '' },
  { label: '自动审核未通过', value: 'check' },
  { label: '审核通过', value: 'normal' },
  { label: '审核未通过', value: 'failed' },
  { label: '无脸照', value: 'no_face' }
]

export const allTopicStatus = [
  { label: '全部', value: '' },
  { label: '创建', value: 'created' },
  { label: '发布', value: 'release' },
  { label: '下架', value: 'off' }
]

export const checkBadgeType = [
  { type: 'warning', value: 'check' },
  { type: 'success', value: 'normal' },
  { type: 'danger', value: 'failed' }
]

export const allReportStatus = [
  { label: '全部', value: '' },
  { label: '待审核', value: 'reported' },
  { label: '正常', value: 'normal' },
  { label: '已审核', value: 'checked' }
]

export const allReportType = {
  '用户头像': 'userid',
  '用户昵称': 'userid',
  '用户签名': 'userid',
  '活动图片': 'activityid',
  '活动内容': 'activityid'
}

export const autoCheckText = '(内容审核中)'

export const checkedText = '【内容涉嫌违规，请重新提交】'

export const seriesItemColor = Array.from(Array(20), () => `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`)

export const pickerOptions = {
  shortcuts: [
    {
      text: '最近一周',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        picker.$emit('pick', [start, end])
      }
    }
  ]
}

export const keepColumnStyle = [
  { min: 29.1, max: 70, background: '#579bf0', color: '#fff' },
  { min: 15, max: 29, background: '#8fbff9', color: '#fff' },
  { min: 1, max: 14.9, background: '#c8e0fc' }
]
