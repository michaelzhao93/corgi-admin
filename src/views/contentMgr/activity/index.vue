<template>
  <div class="contentMgr-activity">
    <div class="flex search-bar">
      <el-form
        :ref="searchRef"
        class="flex-wrap filter"
        :model="searchForm"
        :rules="formRules"
      >
        <el-form-item class="flex filter-item" label="活动ID" prop="activityId">
          <el-input v-model="searchForm.id" type="text" placeholder="请输入活动ID" />
        </el-form-item>
        <el-form-item class="flex filter-item" label="活动标题" prop="title">
          <el-input v-model="searchForm.title" type="text" placeholder="请输入活动标题" />
        </el-form-item>
        <el-form-item class="flex filter-item" label="活动类型" prop="activityType">
          <el-input v-model="searchForm.activityType" type="text" placeholder="请输入活动类型" />
        </el-form-item>
        <el-form-item class="flex filter-item" label="城市" prop="city">
          <el-input v-model="searchForm.city" type="text" placeholder="请输入城市全称（市）" />
        </el-form-item>
        <el-form-item class="flex filter-item" label="审核状态" prop="checkStatus">
          <el-select v-model="searchForm.checkStatus" placeholder="请选择审核状态">
            <el-option
              v-for="(censorship, index) of allActivityCheckStatus"
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
      :default-sort="{prop: 'userId', order: 'ascending'}"
    >
      <el-table-column sortable label="用户ID" align="center" prop="userId" width="150" :sort-method="sortUserId">
        <template slot-scope="scope">
          <userid :id="scope.row.userId" />
        </template>
      </el-table-column>
      <el-table-column sortable label="活动标题" :formatter="formatColumn" align="center" prop="title" />
      <el-table-column sortable label="活动类型" :formatter="formatColumn" align="center" prop="activityType" />
      <el-table-column sortable label="创建时间" :formatter="formatColumn" align="center" prop="createTime" />
      <el-table-column sortable label="最后修改时间" :formatter="formatColumn" align="center" prop="updateTime" />
      <el-table-column sortable label="活动状态" align="center" width="120" prop="status">
        <template slot-scope="scope">
          <activitystatus :status="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column sortable label="审核状态" align="center" width="120" prop="checkStatus">
        <template slot-scope="scope">
          <checkstatus :status="scope.row.checkStatus" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="220">
        <template slot-scope="scope">
          <el-row type="flex" justify="center" align="middle">
            <el-button size="mini" @click="handleActivityDetail(scope.row)">审查详情</el-button>
            <el-button type="danger" size="mini" @click="handleActivityRemove(scope.row)">删除活动</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <paginationtpl :pagination="pagination" :pagination-total="paginationTotal" />
    <detail :use-data="catchedData" :visible.sync="visibleMap.detailDiaVisible" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { queryActivity, countActivity, removeActivity } from '@/api/contentMgr'
import Userid from '@/components/Userid'
import Activitystatus from '@/components/Activitystatus'
import Checkstatus from '@/components/Checkstatus'
import Detail from './Detail'
import tableCommon from '@/mixins/tableCommon'
import { emit } from '@/mixins/commonSet'
import contentMgrCommon from '../mixins/common'
import { allActivityStatus, allActivityCheckStatus } from '@/utils/const'
import pageConfig from './pageConfig'
export default {
  components: { Activitystatus, Checkstatus, Detail, Userid },
  mixins: [tableCommon, emit, contentMgrCommon],
  data() {
    return {
      allActivityStatus,
      allActivityCheckStatus,
      ...pageConfig,
      visibleMap: {
        censorDiaVisible: false,
        detailDiaVisible: false
      }
    }
  },
  computed: {
    activityShow() {
      return this.$store.getters.activityShow
    }
  },
  watch: {
    activityShow(value) {
      !value && this.getData()
    }
  },
  methods: {
    ...mapMutations('activityInfo', {
      'setShow': 'SET_SHOW',
      'setActivityId': 'SET_ACTIVITY_ID'
    }),
    async getData() {
      try {
        this.loadingMap.tableLoading = true
        const task = [this.getActivity(), this.getActivityCount()]
        await Promise.all(task)
      } catch (err) {
        console.log(err)
      } finally {
        this.loadingMap.tableLoading = false
      }
    },
    async getActivity() {
      try {
        const data = await queryActivity({ ...this.searchForm, ...this.pagination })
        this.tableData = data.data
      } catch (err) {
        console.log(err)
      }
    },
    async getActivityCount() {
      try {
        const data = await countActivity({ ...this.searchForm })
        this.paginationTotal = data.data
      } catch (err) {
        console.log(err)
      }
    },
    async handleActivityDetail(data) {
      const { id } = data
      if (id) {
        this.setActivityId(id)
        this.setShow(true)
      }
    },
    async handleActivityRemove(data) {
      try {
        await this.$msgbox.confirm(`确定删除活动：<span class="bold">${data.title}</span>`, '删除活动', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        })
        const activityId = data.id
        await removeActivity({ activityId })
        this.$message({ type: 'success', message: '删除成功' })
        this.getData()
      } catch (err) {
        err !== 'cancel' && console.log(err)
      }
    }
  }
}
</script>

<style lang="scss">
.contentMgr-activity{
  .activityType-selector{
    width: 150px;
  }
}
</style>
