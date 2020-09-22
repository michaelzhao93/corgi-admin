<template>
  <div class="interest-default">
    <el-row class="btn-group">
      <el-button type="primary">新建兴趣</el-button>
    </el-row>
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
      <el-table-column sortable label="使用量" align="center" prop="interestCount" />
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-row v-if="scope.row.status" type="flex" justify="center" align="middle">
            <el-button type="warning" size="mini">下架</el-button>
          </el-row>
          <el-row v-else type="flex" justify="center" align="middle">
            <el-button type="success" size="mini">上架</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <paginationtpl :pagination="pagination" :pagination-total="paginationTotal" />
  </div>
</template>

<script>
import { defaultInterest } from '@/api/operationMgr'
import tableCommon from '@/mixins/tableCommon'
export default {
  mixins: [tableCommon],
  data() {
    return {
      extraHeight: 115
    }
  },
  mounted() {
    this.addTabelHeightListener('parent')
  },
  methods: {
    async getData() {
      try {
        this.loadingMap.tableLoading = true
        const data = await defaultInterest({ ...this.pagination })
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

<style lang="scss" scoped>
.interest-default{
  .btn-group{
    margin-bottom: 20px;
  }
}
</style>
