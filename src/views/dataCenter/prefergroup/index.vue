<template>
  <div class="specify-prefergroup chart-simple">
    <div class="chart">
      <div class="chart-filter flex-wrap">
        <div class="time-range-wrap flex">
          <date-range-picker :time-range.sync="baseTime" :default-today="true" />
          <el-button class="getChartData" type="primary" size="small" @click="handleChartBtnClick">搜索</el-button>
        </div>
      </div>
      <div class="page-desc">{{ $route.meta.title }}：用户中意属性统计。</div>
      <chart v-if="Object.keys(chartData).length" ref="chart" :chart-option="chartOptionWatcher" />
    </div>
    <div v-if="tableData.length" class="table-wrap">
      <div class="table-head flex">
        <div v-text="tableHead" />
        <div>
          <el-button type="primary" size="mini" @click="exportData">下载数据</el-button>
        </div>
      </div>
      <el-table
        :ref="refMap.table"
        v-loading="loadingMap.tableLoading"
        :data="tableData"
        :border="true"
        style="width: 100%"
        :header-cell-style="{textAlign:'center'}"
        :max-height="tableHeight"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          sortable
          label="日期"
          prop="date"
          align="center"
          fixed
        />
        <el-table-column
          v-for="key of useProp"
          :key="`table-column-${key}`"
          sortable
          :label="columnLable[key]"
          :prop="key"
          align="center"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
import specifyCommon from '../mixins/specifyCommon'
import pageConfig from './pageConfig'
export default {
  mixins: [specifyCommon],
  data() {
    return {
      ...pageConfig
    }
  }
}
</script>
