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
                <div class="flex search-bar">
                       <div class="search-btnGroup flex">
        <el-button type="primary" v-if="this.InbarId" @click="handleAddMember()">新增活动</el-button>
            </div>

      </div>

          <div class="flex search-bar">
      <el-form
        :ref="searchRef"
        class="filter flex-wrap"
        :model="searchForm"
        :rules="formRules"
      >
        <el-form-item class="flex filter-item" label="商家ID/名称" prop="userId">
          <el-input v-model="InbarId" type="text" placeholder="请输入商家ID或名称" />
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
      <el-table-column sortable label="商户ID" align="center" prop="userId" width="100">

      </el-table-column>
      <el-table-column  label="活动名称" align="center" prop="title" :formatter="formatColumn" />
      <el-table-column  label="创建时间" align="center" prop="createTime" :formatter="formatColumn" />
      <el-table-column  label="活动简介" align="center" prop="content" :formatter="formatColumn" />
      <el-table-column  label="活动地址" align="center" prop="address" :formatter="formatColumn" />
      <el-table-column  label="活动开始时间" align="center" prop="startTime" :formatter="formatColumn" />
            <el-table-column  label="活动结束时间" align="center" prop="endTime" :formatter="formatColumn" />

            <el-table-column width="120" height="80" label="活动图片" align="center" prop="logo">
        <template slot-scope="scope">
          <img width="120" height="80" v-lazy="scope.row.pics[0].picUrl" class="avator-img">
        </template>
      </el-table-column>
      <el-table-column  label="状态" align="center" prop="state" :formatter="formatColumn" width="50" />
      <el-table-column label="操作" align="center" width="280">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="handleAddMember(scope.row)"
          >编辑</el-button>

          <el-button
            type="danger"
            v-if="scope.row.recommend=='enable'"
            size="mini"
            @click="recommonActive(scope.row,0)"
          >取消推荐</el-button>
            
            <el-button
            type="warning"
            v-else
            size="mini"
            @click="recommonActive(scope.row,1)"
          >推荐</el-button>

              <el-button
            type="success:hover"
            size="mini"
            @click="addHot(scope.row)"
          >添加热门</el-button>
          <!-- <el-button
            type="info"
            size="mini"
            @click="checkPicRefuse(scope)"
          >删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
        <detail :use-data="catchedData" :visible.sync="visibleMap.detailDiaVisible" @emitFunc="acceptEmitFunc"/>
        <Status-dialog :use-data="catchedData" :visible.sync="visibleMap.statusDialogVisible" @emitFunc="acceptEmitFunc" />

  </div>
</template>

<script>
import { get_bar_activity,delete_activity,recommend_activity,unrecommend_activity} from '@/api/shopMgr'
import Censorshipstatus from '@/components/Censorshipstatus'
import Userid from '@/components/Userid'
import Detail from './Detail'
import StatusDialog from './StatusDialog'
import tableCommon from '@/mixins/tableCommon'
import contentMgrCommon from '../mixins/common'
import { parseImageStatus, emit } from '@/mixins/commonSet'
import { allCensorshipTypes } from '@/utils/const'
import pageConfig from './pageConfig'
export default {
  components: { Censorshipstatus,StatusDialog, Detail,Userid },
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
        let barId = this.InbarId;
        let page = 1;
        let pageSize = 100;

        const data = await get_bar_activity({barId,page,pageSize})
                console.log(data)

        this.tableData = data.data.map(item => {
          //item.ctime = item.ctime.slice(0, -2)
            item.state = item.status == "deleted"? '禁用':'启用'
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
   async recommonActive(data,state) {
                      console.log(data)
      if(data == undefined || data.length <= 0)
      {
        let barId = this.InbarId;
        let newdata = ({userId: barId});
        data = newdata;
                console.log(data)
      }
              let activityId = data.id
      if(state==1)
      {
        await recommend_activity({ 'activityId':activityId})
      }
      else if(state==0)
      {
        await unrecommend_activity({ 'activityId':activityId})
      }
        this.$message({ type: 'success', message: '操作成功' })
        this.get_bar_activity()
    },
      
      
      async addHot(data) 
      {
      this.catchedData = data
      this.visibleMap.statusDialogVisible = true
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
