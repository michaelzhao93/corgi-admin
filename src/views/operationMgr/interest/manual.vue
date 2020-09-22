<template>
  <div class="interest-manual">
    <el-form :ref="searchRef" class="flex-wrap filter" :model="searchForm" :rules="formRules">
      <el-form-item class="flex filter-item" label="兴趣" prop="interest">
        <el-input v-model="searchForm.interest" type="text" placeholder="请输入兴趣" />
      </el-form-item>
      <el-form-item class="flex filter-item" label="兴趣分类" prop="interestType">
        <el-select v-model="searchForm.interestType" placeholder="请选择审核状态">
          <el-option
            v-for="interest of allInterestType"
            :key="interest.value"
            :label="interest.label"
            :value="interest.value"
          />
        </el-select>
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
      <el-table-column sortable label="兴趣" align="center" prop="interest" />
      <el-table-column sortable label="兴趣分类" align="center" prop="interestType" />
      <el-table-column sortable label="兴趣使用量" align="center" prop="interestCount" />
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteTopic(scope)">删除兴趣</el-button>
        </template>
      </el-table-column>
    </el-table>
    <paginationtpl :pagination="pagination" :pagination-total="paginationTotal" />
  </div>
</template>

<script>
import { manualInterest } from '@/api/operationMgr'
import tableCommon from '@/mixins/tableCommon'
export default {
  mixins: [tableCommon],
  data() {
    return {
      extraHeight: 55,
      searchForm: {
        interest: '',
        interestType: ''
      },
      allInterestType: [
        { label: '全部', value: '' }
      ],
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
        const data = await manualInterest({ ...this.searchForm, ...this.pagination })
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
