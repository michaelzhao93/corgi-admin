<template>
  <div class="keep-analyse">
    <div class="flex search-bar">
      <el-form
        :ref="searchRef"
        class="filter flex-wrap"
        :model="searchForm"
        :rules="formRules"
      >
        <el-form-item class="flex filter-item" label="时间范围" prop="dateRange">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            size="small"
          />
        </el-form-item>
        <el-form-item class="flex filter-item" label="留存天数" prop="stayCount">
          <el-input v-model="searchForm.stayCount" type="text" placeholder="留存天数少于..." />
        </el-form-item>
      </el-form>
      <div class="search-btnGroup flex">
        <el-button type="primary" @click="getData">搜索</el-button>
        <el-button type="primary" @click="resetForm">重置</el-button>
      </div>
    </div>
    <el-table
      :ref="refMap.table"
      v-loading="loadingMap.tableLoading"
      :data="tableData"
      :border="true"
      style="width: 100%"
      :header-cell-style="{textAlign:'center'}"
      :height="tableHeight"
      :cell-style="getColumnStyle"
      :default-sort="{prop: 'loginDate', order: 'descending'}"
    >
      <el-table-column sortable label="日期" align="center" prop="loginDate" fixed />
      <el-table-column sortable label="用户数" align="center" prop="base" />
      <el-table-column
        v-for="item of keepColumn"
        :key="`column-keepday-${item.keepDay}`"
        sortable
        :label="item.label"
        align="center"
        :prop="item.keepDay"
        :formatter="getKeepPersent"
      />
    </el-table>
  </div>
</template>

<script>
import tableCommon from '@/mixins/tableCommon'
import { searchCommon } from '@/mixins/commonSet'
import { getStatistics, getUserStay } from '@/api/dataCenter'
import { pickerOptions, keepColumnStyle } from '@/utils/const'
import pageConfig from './pageConfig'
export default {
  mixins: [tableCommon, searchCommon],
  data() {
    return {
      ...pageConfig,
      pickerOptions,
      extraHeight: 0,
      keepDay: [1, 2, 3, 4, 5, 6, 7, 14, 30, 60, 90],
      keepColumn: [
        { label: '+1日', keepDay: '1' },
        { label: '+2日', keepDay: '2' },
        { label: '+3日', keepDay: '3' },
        { label: '+4日', keepDay: '4' },
        { label: '+5日', keepDay: '5' },
        { label: '+6日', keepDay: '6' },
        { label: '+7日', keepDay: '7' },
        { label: '+14日', keepDay: '14' },
        { label: '+1月', keepDay: '30' },
        { label: '+2月', keepDay: '60' },
        { label: '+3月', keepDay: '90' }
      ],
      loadingMap: {
        tableLoading: false
      }
    }
  },
  mounted() {
    this.addTabelHeightListener('parent')
  },
  methods: {
    generateData(params) {
      console.log(params)
      const { startDate, endDate, stayCount } = Object.entries(params).reduce((data, [key, value]) => {
        data[key] = key === 'stayCount' ? value : this.$day(value)
        return data
      }, {})
      const diff = Math.abs(startDate.diff(endDate, 'day'))
      return Array(diff).fill('').map((item, index) => {
        const loginDate = startDate.add(index, 'day')
        let count = Math.floor(Math.random() * 1000)
        return Array(Number(stayCount) + 1).fill('').map((keep, keepIndex) => {
          count = parseInt(count * (1 - Math.floor(Math.random() * 30) / 100))
          return {
            loginDate: loginDate.format('YYYY-MM-DD'),
            stayDate: loginDate.add(keepIndex, 'day').format('YYYY-MM-DD'),
            stayCount: keepIndex,
            count
          }
        })
      }).flat(Infinity)
    },
    async getData() {
      if (this.$common.checkFormValid(this, this.searchRef)) {
        try {
          this.loadingMap.tableLoading = true
          const searchForm = this.parseForm()
          const [keepData, regisData] = await Promise.all([this.getKeepData(searchForm), this.getRegisData(searchForm)])
          this.tableData = this.parseTabelData(regisData, keepData)
        } catch (err) {
          console.log(err)
          this.tableData = []
        } finally {
          this.loadingMap.tableLoading = false
        }
      }
    },
    async getRegisData(searchForm) {
      const type = 'register'
      const { startDate, endDate } = searchForm
      const result = await getStatistics({ type, startDate, endDate })
      return result.data
    },
    async getKeepData(searchForm) {
      const result = await getUserStay(searchForm)
      return result.data
    },
    parseTabelData(regisData, keepData) {
      keepData = keepData.reduce((obj, item) => {
        if (!obj[item.loginDate]) {
          obj[item.loginDate] = {}
        }
        obj[item.loginDate][item.stayCount] = item.count
        return obj
      }, {})
      return regisData.map(({ date, count }) => {
        const loginDate = date
        const temp = { loginDate }
        temp.base = count
        if (keepData[loginDate] && keepData[loginDate].hasOwnProperty('1')) {
          this.keepDay.forEach(keepDay => {
            temp[keepDay] = keepData[loginDate][keepDay]
          })
        }
        return temp
      })
    },
    getKeepPersent(row, column, cellValue) {
      let value = 'N/A'
      if (typeof cellValue === 'number') {
        if (row.base === 0) {
          value = 0 + '%'
        } else {
          value = (cellValue / row.base * 100).toFixed(1) + '%'
        }
      }
      return value
    },
    getColumnStyle({ row, column, rowIndex, columnIndex }) {
      const value = row[column.property]
      if (typeof value === 'number' && row.base !== 0) {
        const persent = (value / row.base * 100).toFixed(1)
        const check = keepColumnStyle.find(item => persent >= item.min && persent <= item.max)
        return check && {
          backgroundColor: check.background,
          color: check.color || '#000'
        }
      }
    },
    parseForm() {
      const [startDate, endDate] = this.searchForm.dateRange.map(date => this.$day(date).format('YYYY-MM-DD'))
      const { stayCount } = this.searchForm
      return { startDate, endDate, stayCount }
    }
  }
}
</script>
