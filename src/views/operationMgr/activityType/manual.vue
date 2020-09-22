<template>
  <div class="activity-manual">
    <el-form :ref="searchRef" class="flex-wrap filter" :model="searchForm" :rules="formRules">
      <el-form-item class="flex filter-item" label="活动类型名称" prop="activityType">
        <el-input v-model="searchForm.activityType" type="text" placeholder="请输入活动类型" />
      </el-form-item>
      <div class="filter-item search">
        <el-button type="primary" @click="getData">搜索</el-button>
      </div>
    </el-form>
    <el-table
      :ref="refMap.table"
      v-loading="loadingMap.tableLoading"
      :data="tableData"
      :border="true"
      style="width: 100%"
      :header-cell-style="{textAlign:'center'}"
      :height="tableHeight"
      empty-text="--"
    >
      <el-table-column sortable label="活动类型名称" align="center" prop="activityType" />
      <el-table-column sortable label="首次创建时间" align="center" prop="createTime" />
      <el-table-column sortable label="活动创建量" align="center" prop="createCount" />
    </el-table>
    <paginationtpl :pagination="pagination" :pagination-total="paginationTotal" />
  </div>
</template>

<script>
import { manualActiveType } from '@/api/operationMgr'
import tableCommon from '@/mixins/tableCommon'
export default {
  mixins: [tableCommon],
  data() {
    return {
      extraHeight: 55,
      searchForm: {
        activityType: ''
      },
      formRules: {}
    }
  },
  mounted() {
    this.addTabelHeightListener('parent')
  },
  methods: {
    async getData() {
      try {
        this.loadingMap.tableLoading = true
        const data = await manualActiveType({ ...this.searchForm, ...this.pagination })
        this.tableData = data.data
        this.paginationTotal = data.total
      } catch (err) {
        console.log(err)
      } finally {
        this.loadingMap.tableLoading = false
      }
    }
  }
}
</script>
