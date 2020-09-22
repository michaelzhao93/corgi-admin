<template>
  <div class="activity-default">
    <el-row class="btn-group">
      <el-button type="primary">新建活动类型</el-button>
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
      <el-table-column min-width="70" label="活动类型icon" align="center" prop="activityIcon">
        <template slot-scope="scope">
          <img v-lazy="scope.row.activityIcon" class="activityIcon">
        </template>
      </el-table-column>
      <el-table-column sortable label="活动类型名称" align="center" prop="activityType" />
      <el-table-column sortable label="活动创建量" align="center" prop="createCount" />
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
import { defaultActiveType } from '@/api/operationMgr'
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
        const data = await defaultActiveType({ ...this.pagination })
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
.activity-default{
  .btn-group{
    margin-bottom: 20px;
  }
  .activityIcon{
    width: 50px;
    height:50px;
  }
}
</style>
