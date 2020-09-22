<template>
  <div class="contentMgr-report">
    <div class="flex search-bar">
      <el-form
        :ref="searchRef"
        class="flex-wrap filter"
        :model="searchForm"
        :rules="formRules"
      >
        <el-form-item class="flex filter-item" label="审核状态" prop="status">
          <el-select v-model="searchForm.reportStatus" placeholder="请选择审核状态">
            <el-option
              v-for="(censorship, index) of allReportStatus"
              :key="`user-check-status-${index}`"
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
    <div class="page-desc">{{ $route.meta.title }}：展示所有历史累计活动信息以及管理（注意：删除活动将物理删除，无法恢复。）</div>
    <el-table
      :ref="refMap.table"
      v-loading="loadingMap.tableLoading"
      :data="tableData"
      :border="true"
      style="width: 100%"
      :header-cell-style="{textAlign:'center'}"
      :height="tableHeight"
    >
      <el-table-column sortable label="举报人ID" :formatter="formatColumn" align="center" prop="reportUserId">
        <template slot-scope="scope">
          <userid :id="scope.row.reportUserId" />
        </template>
      </el-table-column>
      <el-table-column sortable label="举报类型" :formatter="formatColumn" align="center" prop="accuseType" />
      <el-table-column sortable label="被举报用户ID/活动ID" align="center" prop="accuseId">
        <template slot-scope="scope">
          <span :is="allReportType[scope.row.accuseType]" :id="scope.row.accuseId" />
        </template>
      </el-table-column>
      <el-table-column sortable label="举报原因" :formatter="formatColumn" align="center" prop="reason" />
      <el-table-column sortable label="举报描述" :formatter="formatColumn" align="center" prop="desc" />
      <el-table-column sortable label="是否上传图片" :formatter="formatColumn" align="center" prop="pics">
        <template slot-scope="scope">
          <span v-text="scope.row.pics.length ? '是' : '否'" />
        </template>
      </el-table-column>
      <el-table-column sortable label="审核状态" align="center" width="120" prop="reportStatus">
        <template slot-scope="scope">
          <report-status :status="scope.row.reportStatus" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="220">
        <template slot-scope="scope">
          <el-row type="flex" justify="center" align="middle">
            <el-button size="mini" @click="handleReportDetail(scope.row)">查看详情</el-button>
            <el-button type="primary" size="mini" @click="showStatusDialog(scope.row)">处理完成</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <paginationtpl :pagination="pagination" :pagination-total="paginationTotal" />
    <detail :use-data="catchedData" :visible.sync="visibleMap.detailDiaVisible" />
    <Status-dialog :use-data="catchedData" :visible.sync="visibleMap.statusDialogVisible" @emitFunc="acceptEmitFunc" />
  </div>
</template>

<script>
import { getReportList, countReport } from '@/api/contentMgr'
import Userid from '@/components/Userid'
import Activityid from '@/components/Activityid'
import ReportStatus from '@/components/ReportStatus'
import Detail from './Detail'
import StatusDialog from './StatusDialog'
import tableCommon from '@/mixins/tableCommon'
import { emit } from '@/mixins/commonSet'
import contentMgrCommon from '../mixins/common'
import { allReportStatus, allReportType } from '@/utils/const'
import pageConfig from './pageConfig'
export default {
  components: { ReportStatus, Detail, StatusDialog, Userid, Activityid },
  mixins: [tableCommon, emit, contentMgrCommon],
  data() {
    return {
      allReportStatus,
      allReportType,
      ...pageConfig,
      visibleMap: {
        censorDiaVisible: false,
        detailDiaVisible: false,
        statusDialogVisible: false
      }
    }
  },
  methods: {
    async getData() {
      try {
        this.loadingMap.tableLoading = true
        const task = [this.getReport(), this.getReportCount()]
        await Promise.all(task)
      } catch (err) {
        console.log(err)
      } finally {
        this.loadingMap.tableLoading = false
      }
    },
    async getReport() {
      try {
        const data = await getReportList({ ...this.searchForm, ...this.pagination })
        this.tableData = data.data
      } catch (err) {
        console.log(err)
      }
    },
    async getReportCount() {
      try {
        const data = await countReport({ ...this.searchForm })
        this.paginationTotal = data.data
      } catch (err) {
        console.log(err)
      }
    },
    async handleReportDetail(data) {
      this.catchedData = data
      this.visibleMap.detailDiaVisible = true
    },
    async showStatusDialog(data) {
      this.catchedData = data
      this.visibleMap.statusDialogVisible = true
    }
  }
}
</script>
