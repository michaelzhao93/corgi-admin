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
        <el-button type="primary" @click="handleAddMember({})">创建消息</el-button>
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
      <el-table-column sortable label="消息ID" align="center" prop="id">

      </el-table-column>
      <el-table-column  label="消息名称" align="center" prop="title" :formatter="formatColumn" />
      <el-table-column sortable label="创建时间" align="center" prop="ctime" :formatter="formatColumn" />
      <el-table-column  label="消息内容" align="center" prop="content" :formatter="formatColumn" />
      <el-table-column  sortable label="状态" align="center" prop="state" :formatter="formatColumn" />
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
            @click="sendMsg(scope.row)"
          >发送设置</el-button>
          <!-- <el-button
            type="info"
            size="mini"
            @click="handleAddMember(scope.row)"
          >删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
        <detail :use-data="catchedData" :visible.sync="visibleMap.detailDiaVisible"  @emitFunc="acceptEmitFunc"/>
            <Status-dialog :use-data="catchedData" :visible.sync="visibleMap.statusDialogVisible" @emitFunc="acceptEmitFunc" />

  </div>
</template>

<script>
import { get_system_message} from '@/api/msgMgr'
import Censorshipstatus from '@/components/Censorshipstatus'
import Userid from '@/components/Userid'
import ReportStatus from '@/components/ReportStatus'
import StatusDialog from './StatusDialog'

import Detail from './Detail'
import tableCommon from '@/mixins/tableCommon'
import contentMgrCommon from '../mixins/common'
import { allCensorshipTypes } from '@/utils/const'
import { parseImageStatus, emit } from '@/mixins/commonSet'
import pageConfig from './pageConfig'
export default {
  components: {  ReportStatus, StatusDialog,Censorshipstatus, Detail,Userid },
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
        let page = 1;
        let pageSize = 100;

        const data = await get_system_message({page,pageSize})
                console.log(data)

        this.tableData = data.data.map(item => {
          item.ctime = item.ctime.slice(0, -2)
          if(item.status=="created")
            item.state = "待发送"
          if(item.status=="disabled")
            item.state = "未启用"
          if(item.status=="sent")
            item.state = "已发送"
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
      async sendMsg(data) {
      this.catchedData = data
      this.visibleMap.statusDialogVisible = true
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
