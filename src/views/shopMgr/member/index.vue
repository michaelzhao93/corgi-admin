<template>
  <div class="contentMgr-avator">
    <div class="flex search-bar">
      <el-form
        class="flex-wrap filter"
      >
        <!-- <el-form-item class="flex filter-item" label="用户ID" prop="userId">
          <el-input v-model="searchForm.activityId" type="text" placeholder="请输入用户ID" />
        </el-form-item> -->
             <div class="flex search-bar">
                       <div class="search-btnGroup flex">
        <el-button type="primary" @click="handleAddMember({})">新增商户</el-button>
            </div>

      </div>
      </el-form>
    </div>
    <el-table
      :ref="refMap.table"
      v-loading="loadingMap.tableLoading"
      class="main-table"
      :data="tableData"
      :border="true"
      style="width: 100%"
      :header-cell-style="{textAlign:'center'}"
    >
      <el-table-column sortable label="商户ID" align="center" prop="barId">

      </el-table-column>
      <el-table-column  label="商户名称" align="center" prop="barName" :formatter="formatColumn" />
      <el-table-column sortable label="创建时间" align="center" prop="ctime" :formatter="formatColumn" />
      <el-table-column  label="商户地址" align="center" prop="address" :formatter="formatColumn" />
      <el-table-column  label="商户坐标" align="center" prop="jw" :formatter="formatColumn" />
      <el-table-column sortable label="范围半径" align="center" prop="range" :formatter="formatColumn" />
            <el-table-column  label="城市" align="center" prop="city" :formatter="formatColumn" />
      <el-table-column  label="商户电话" align="center" prop="tel" :formatter="formatColumn" />
      <el-table-column  sortable label="状态" align="center" prop="state" :formatter="formatColumn" />

      <el-table-column width="120" height="80" label="商户logo" align="center" prop="logo">
        <template slot-scope="scope">
          <img width="120" height="80" v-lazy="scope.row.logo" class="avator-img">
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="220">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="handleAddMember(scope.row)"
          >编辑</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="handleAddMember(scope.row)"
          >启用</el-button>
          <!-- <el-button
            type="info"
            size="mini"
            @click="handleAddMember(scope.row)"
          >删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
        <detail :use-data="catchedData" :visible.sync="visibleMap.detailDiaVisible"  @emitFunc="acceptEmitFunc"/>
  </div>
</template>

<script>
import { get_bar_list} from '@/api/shopMgr'
import Censorshipstatus from '@/components/Censorshipstatus'
import Userid from '@/components/Userid'
import Detail from './Detail'
import tableCommon from '@/mixins/tableCommon'
import contentMgrCommon from '../mixins/common'
import { allCensorshipTypes } from '@/utils/const'
import { parseImageStatus, emit } from '@/mixins/commonSet'
import pageConfig from './pageConfig'
export default {
  components: { Censorshipstatus, Detail,Userid },
  mixins: [tableCommon, contentMgrCommon,emit],

  data() {
    return {
      allCensorshipTypes,
      visibleMap: {
        censorDiaVisible: false,
        detailDiaVisible: false,
        statusDialogVisible: false
      },
      ...pageConfig
    }
  },
  methods: {
    async getData() {
      try {
        const data = await get_bar_list({})
                console.log(data)

        this.tableData = data.data.map(item => {
          item.ctime = item.ctime.slice(0, -2)
          item.jw = item.lng+','+item.lat;
          item.state = item.status == 0? '禁用':'启用'
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

    async handleAddMember(data) {
      this.catchedData = data
      this.visibleMap.detailDiaVisible = true
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
