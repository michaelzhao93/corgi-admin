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
                <!-- <div class="flex search-bar">
                       <div class="search-btnGroup flex">
        <el-button type="primary" v-if="this.InbarId" @click="handleAddMember()">新增活动</el-button>
            </div> -->

      <!-- </div> -->

          <div class="flex search-bar">
      <el-form
        :ref="searchRef"
        class="filter flex-wrap"
        :model="searchForm"
        :rules="formRules"
      >
        <el-form-item class="flex filter-item" label="消息ID" prop="userId">
          <el-input v-model="InbarId" type="text" placeholder="请输入消息ID" />
        </el-form-item>
      </el-form>
      <div class="search-btnGroup flex">
        <el-button type="primary" @click="get_bar_activity">搜索</el-button>
      </div>
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
    >
          <el-table-column sortable label="ID" align="center" prop="id" width="150">
                  </el-table-column>
      <el-table-column sortable label="消息ID" align="center" prop="messageId" width="150">

      </el-table-column>
            <el-table-column  label="发送至" align="center" prop="nickname" :formatter="formatColumn" />
      <el-table-column  label="创建时间" align="center" prop="ctime" :formatter="formatColumn" />
      <el-table-column  label="状态" align="center" prop="status" :formatter="formatColumn" />
      <el-table-column  label="失败原因" align="center" prop="reason" :formatter="formatColumn" />
    </el-table>
        <detail :use-data="catchedData" :visible.sync="visibleMap.detailDiaVisible" @emitFunc="acceptEmitFunc"/>
  </div>
</template>

<script>
import { get_message_record} from '@/api/msgMgr'
import Censorshipstatus from '@/components/Censorshipstatus'
import Userid from '@/components/Userid'
import Detail from './Detail'
import tableCommon from '@/mixins/tableCommon'
import contentMgrCommon from '../mixins/common'
import { parseImageStatus, emit } from '@/mixins/commonSet'
import { allCensorshipTypes } from '@/utils/const'
import pageConfig from './pageConfig'
export default {
  components: { Censorshipstatus, Detail,Userid },
  mixins: [tableCommon, contentMgrCommon,emit],
  data() {
    return {
      allCensorshipTypes,
      InbarId: '', 
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
    },
    async get_bar_activity() {
      try {
        let messageId = "";
        let page = 1;
        let pageSize = 100;

        const data = await get_message_record({messageId,page,pageSize})
                console.log(data)

        this.tableData = data.data.map(item => {
            item.ctime = item.ctime.slice(0, -2)
            //item.state = item.status == "deleted"? '禁用':'启用'
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
                      console.log(data)
      if(data == undefined || data.length <= 0)
      {
        let barId = this.InbarId;
        let newdata = ({userId: barId});
        data = newdata;
                console.log(data)
      }
      this.catchedData = data
      this.visibleMap.detailDiaVisible = true
    },
    async checkPicRefuse(scope) {
      try {
        await this.$msgbox.confirm('确定删除吗', '提醒', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        })
        let activityId = scope.row.id
        await delete_activity({ 'activityId':activityId})
        this.$message({ type: 'success', message: '操作成功' })
        this.get_bar_activity()
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
