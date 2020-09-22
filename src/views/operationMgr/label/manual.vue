<template>
  <div class="interest-manual">
    <el-form :ref="searchRef" class="flex-wrap filter" :model="searchForm" :rules="formRules">
      <el-form-item class="flex filter-item" label="标签" prop="label">
        <el-input v-model="searchForm.label" type="text" placeholder="请输入标签" />
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
      <el-table-column sortable label="标签" align="center" prop="label" />
      <el-table-column sortable label="标签使用量" align="center" prop="labelCount" />
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteTopic(scope)">删除标签</el-button>
        </template>
      </el-table-column>
    </el-table>
    <paginationtpl :pagination="pagination" :pagination-total="paginationTotal" />
  </div>
</template>

<script>
import { manualLabel } from '@/api/operationMgr'
import tableCommon from '@/mixins/tableCommon'
export default {
  mixins: [tableCommon],
  data() {
    return {
      extraHeight: 55,
      searchForm: {
        label: ''
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
        const data = await manualLabel({ ...this.searchForm, ...this.pagination })
        this.tableData = data.data
        this.paginationTotal = data.total
      } catch (err) {
        console.log(err)
      } finally {
        this.loadingMap.tableLoading = false
      }
    },
    deleteTopic(scope) {

    }
  }
}
</script>
