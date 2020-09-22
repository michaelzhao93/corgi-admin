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
        <el-form-item class="flex filter-item" label="审核状态" prop="status">
          <el-select v-model="searchForm.status" placeholder="请选择审核状态">
            <el-option
              v-for="censorship of allCensorshipTypes"
              :key="censorship.value"
              :label="censorship.label"
              :value="censorship.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="search-btnGroup flex">
        <el-button type="primary" @click="searchData">搜索</el-button>
        <el-button type="primary" @click="resetForm">重置</el-button>
      </div>
    </div>
    <div class="page-desc">{{ $route.meta.title }}：仅头像照片自动审核未通过的将进入此板块集中处理</div>
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
      :default-sort="{prop: 'userId', order: 'descending'}"
    >
      <el-table-column sortable label="用户ID" align="center" prop="userId" width="150">
        <template slot-scope="scope">
          <userid :id="scope.row.userId" />
        </template>
      </el-table-column>
      <el-table-column min-width="120" label="音频内容" align="center" prop="image">
          <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="playMusic(scope)"
          >播放音频</el-button>
        </template>
      </el-table-column>
      <el-table-column sortable label="审核状态" align="center" prop="ctime" :formatter="formatColumn" width="150">
        <template slot-scope="scope">
          <censorshipstatus :status="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status==='check'"
            type="success"
            size="mini"
            @click="checkPicPass(scope)"
          >通过</el-button>
          <el-button
            v-if="scope.row.status!=='failed'"
            type="danger"
            size="mini"
            @click="checkPicRefuse(scope)"
          >不通过</el-button>
          <el-button
            v-if="scope.row.status==='failed'"
            type="info"
            disabled
            size="mini"
          >已删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <paginationtpl :pagination="pagination" :pagination-total="paginationTotal" />
  </div>
</template>

<script>
import { get_check_sound, count_check_sound, pass_sound, refuse_sound ,add_system_message} from '@/api/contentMgr'
import Censorshipstatus from '@/components/Censorshipstatus'
import Userid from '@/components/Userid'
import tableCommon from '@/mixins/tableCommon'
import contentMgrCommon from '../mixins/common'
import { allCensorshipTypes } from '@/utils/const'
import pageConfig from './pageConfig'
var BenzAMRRecorder = require('benz-amr-recorder');

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
        const task = [this.get_check_sound(), this.count_check_sound()]
        await Promise.all(task)
      } catch (err) {
        console.log(err)
      } finally {
        this.loadingMap.tableLoading = false
      }
    },
    async get_check_sound() {
      try {
        const type = this.censorType
        const data = await get_check_sound({ ...this.searchForm, ...this.pagination})
        this.tableData = data.data.map(item => {


                  console.log(item)
          return item
        })
      } catch (err) {
        console.log(err)
      }
    },
    async count_check_sound() {
      try {
        const type = this.censorType
        const data = await count_check_sound({ ...this.searchForm, type })
        this.paginationTotal = data.data
      } catch (err) {
        console.log(err)
      }
    },
    async checkPicPass(scope) {
      try {
        const { dataId } = scope.row
        const userId = -1
        await pass_sound({ dataId, userId })
        this.$message({ type: 'success', message: '操作成功' })
        this.getData()
      } catch (err) {
        console.log(err)
      }
    },
        async playMusic(scope) {

this.audio = new Audio();
    this.audio.src = scope.row.soundUrl;
    let playPromise;
    let second = 10;
    
   //加载音频
    playPromise = this.audio.play();

    },
    async checkPicRefuse(scope) {
      try {
        await this.$msgbox.confirm('确定不通过该语音', '提醒', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        })
        const { dataId } = scope.row
        const userId = -1
        await refuse_sound({ dataId, userId })
        this.sendmessage(scope.row.userId);
        this.$message({ type: 'success', message: '操作成功' })
        this.getData()
      } catch (err) {
        err !== 'cancel' && console.log(err)
      }
    },
        async sendmessage(id) {

      let content =  '很抱歉~您发送的语音审核失败咯，快调整下姿势重新来过吧';
      let sentTime =  0;
      let title =  '给'+id+'发的审核通知';
      let status = "created";
      let rules = [
      {
        ruleKey: "userId",
        ruleValue: id
      }]
      let data = ({ content: content, status: status, sentTime: sentTime, title: title, rules: rules});
      console.log(data)
      add_system_message(data);
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
