<template>
  <div class="contentMgr-avator">
    <div class="flex search-bar">
      <el-form
        :ref="searchRef"
        class="flex-wrap filter"
        :model="searchForm"
        :rules="formRules"
      >
        <!-- <el-form-item class="flex filter-item" label="用户ID" prop="userId">
          <el-input v-model="searchForm.activityId" type="text" placeholder="请输入用户ID" />
        </el-form-item> -->
                <div class="flex filter-item">
        <el-button type="primary" @click="addShop">新增商户</el-button>
      </div>
      </el-form>
    </div>
    <el-table
      :ref="refMap.table"
      v-loading="loadingMap.tableLoading"
      v-viewer="{movable: true}"
      class="main-table"
      :data="tableData"
      :border="true"
      style="width: 100%"
      :header-cell-style="{textAlign:'center'}"
      :height="tableHeight"
      :default-sort="{prop: 'barId', order: 'descending'}"
    >
      <el-table-column sortable label="商户ID" align="center" prop="barId" width="150">

      </el-table-column>
      <el-table-column  label="商户名称" align="center" prop="barName" :formatter="formatColumn" />
      <el-table-column  label="创建时间" align="center" prop="ctime" :formatter="formatColumn" />
      <el-table-column  label="商户地址" align="center" prop="address" :formatter="formatColumn" />
      <el-table-column  label="商户坐标" align="center" prop="lat" :formatter="formatColumn" />
      <el-table-column  label="范围半径" align="center" prop="range" :formatter="formatColumn" />
      <el-table-column  label="商户电话" align="center" prop="tel" :formatter="formatColumn" />
      <el-table-column  label="状态" align="center" prop="status" :formatter="formatColumn" />

      <el-table-column min-width="120" label="商户logo" align="center" prop="logo">
        <template slot-scope="scope">
          <img v-lazy="scope.row.picUrl" class="avator-img">
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="checkPicPass(scope)"
          >编辑</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="checkPicRefuse(scope)"
          >启用</el-button>
          <el-button
            type="info"
            size="mini"
            @click="checkPicRefuse(scope)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <paginationtpl :pagination="pagination" :pagination-total="paginationTotal" />
  </div>
</template>

<script>
import { get_bar_list} from '@/api/shopMgr'
import Censorshipstatus from '@/components/Censorshipstatus'
import Userid from '@/components/Userid'
import tableCommon from '@/mixins/tableCommon'
import contentMgrCommon from '../mixins/common'
import { allCensorshipTypes } from '@/utils/const'
import pageConfig from './pageConfig'
export default {
  components: { Censorshipstatus, Userid },
  mixins: [tableCommon, contentMgrCommon],
  data() {
    return {
      allCensorshipTypes,
      ...pageConfig
    }
  },
  methods: {
    async getData() {
      try {
        this.loadingMap.tableLoading = true
                                        console.log(this.get_bar_list())

        const task = [this.get_bar_list()]

        await Promise.all(task)
      } catch (err) {
        console.log(err)
      } finally {
        this.loadingMap.tableLoading = false
      }
    },
    async get_bar_list() {
      try {
        const data = await get_bar_list({})
        this.tableData = data.data.map(item => {
          //item.ctime = item.ctime.slice(0, -2)
          return item
        })
      } catch (err) {
        console.log(err)
      }
    },
    async checkPicPass(scope) {
      try {
        const { dataId } = scope.row
        const type = this.censorType
        const userId = -1
        await passPic({ dataId, type, userId })
        this.$message({ type: 'success', message: '操作成功' })
        this.getData()
      } catch (err) {
        console.log(err)
      }
    },
      async addShop() {

              this.$router.push({ path: this.redirect || '/' })

      
    },
    async checkPicRefuse(scope) {
      try {
        await this.$msgbox.confirm('确定不通过该图片', '提醒', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        })
        const { dataId } = scope.row
        const type = this.censorType
        const userId = -1
        await refusePic({ dataId, type, userId })
        this.$message({ type: 'success', message: '操作成功' })
        this.getData()
      } catch (err) {
        err !== 'cancel' && console.log(err)
      }
    }
  }
}
</script>

<style lang="scss">
.contentMgr-avator{
  .main-table{
    .avator-img{
      width: auto;
      height: 100px;
    }
  }
}
</style>
