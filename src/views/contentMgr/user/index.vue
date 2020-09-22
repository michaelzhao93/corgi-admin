<template>
  <div class="contentMgr-user">
    <div class="flex search-bar">
      <el-form
        :ref="searchRef"
        class="filter flex-wrap"
        :model="searchForm"
        :rules="formRules"
      >
        <el-form-item class="flex filter-item" label="用户ID" prop="userId">
          <el-input v-model="searchForm.userId" type="text" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item class="flex filter-item" label="用户昵称" prop="nickname">
          <el-input v-model="searchForm.nickname" type="text" placeholder="请输入用户昵称" />
        </el-form-item>
        <el-form-item class="flex filter-item" label="用户手机号" prop="telNo">
          <el-input v-model="searchForm.telNo" type="text" placeholder="请输入用户手机号" />
        </el-form-item>
        <el-form-item class="flex filter-item" label="审核状态" prop="checkStatus">
          <el-select v-model="searchForm.checkStatus" placeholder="请选择审核状态">
            <el-option
              v-for="(censorship, index) of allCheckStatus"
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
    <div class="page-desc">{{ $route.meta.title }}：展示所有历史累计用户信息以及管理，（注意：删除用户将物理删除，无法恢复。）</div>
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
      <el-table-column sortable label="用户ID" align="center" prop="userId" width="150" :sort-method="sortUserId" :formatter="formatColumn" />
      <el-table-column sortable label="用户昵称" align="center" prop="nickname" :formatter="formatColumn" />
      <el-table-column sortable label="用户描述" align="center" prop="desc" min-width="200" :formatter="formatColumn" />
      <el-table-column sortable label="用户手机号" align="center" prop="telNo" :formatter="formatColumn" />
      <el-table-column sortable label="用户创建时间" align="center" prop="createTime" :formatter="formatColumn" />
      <el-table-column sortable label="审核状态" align="center" width="120">
        <template slot-scope="scope">
          <checkstatus :status="scope.row.checkStatus" />
        </template>
      </el-table-column>
      <el-table-column width="200" label="操作" align="center" prop="status">
        <template slot-scope="scope">
          <el-row type="flex" justify="center" align="middle">
            <el-button size="mini" @click="handleUserDetail(scope.row)">审查详情</el-button>
            <el-button type="danger" size="mini" @click="handleDeleteUser(scope.row)">删除账号</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <paginationtpl :pagination="pagination" :pagination-total="paginationTotal" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { queryUser, countUser, deleteUser } from '@/api/contentMgr'
import Checkstatus from '@/components/Checkstatus'
import tableCommon from '@/mixins/tableCommon'
import { emit } from '@/mixins/commonSet'
import contentMgrCommon from '../mixins/common'
import { allCheckStatus } from '@/utils/const'
import pageConfig from './pageConfig'
export default {
  components: { Checkstatus },
  mixins: [tableCommon, emit, contentMgrCommon],
  data() {
    return {
      ...pageConfig,
      allCheckStatus,
      visibleMap: {
        censorDiaVisible: false
      }
    }
  },
  computed: {
    userShow() {
      return this.$store.getters.userShow
    }
  },
  watch: {
    userShow(value) {
      !value && this.getData()
    }
  },
  methods: {
    ...mapMutations('userInfo', {
      'setShow': 'SET_SHOW',
      'setUserId': 'SET_USER_ID'
    }),
    async getData() {
      try {
        this.loadingMap.tableLoading = true
        const task = [this.getUser(), this.getUserCount()]
        await Promise.all(task)
      } catch (err) {
        console.log(err)
      } finally {
        this.loadingMap.tableLoading = false
      }
    },
    async getUser() {
      try {
        const data = await queryUser({ ...this.searchForm, ...this.pagination })
        this.tableData = data.data.map(item => {
          if (typeof item.createTime === 'string') {
            item.createTime = item.createTime.slice(0, -2)
          }
          return item
        })
      } catch (err) {
        console.log(err)
      }
    },
    async getUserCount() {
      try {
        const data = await countUser({ ...this.searchForm })
        this.paginationTotal = data.data
      } catch (err) {
        console.log(err)
      }
    },
    async handleUserDetail(data) {
      const { userId } = data
      if (userId) {
        this.setUserId(userId)
        this.setShow(true)
      }
    },
    async handleDeleteUser(data) {
      try {
        await this.$msgbox.confirm(`确定删除用户ID：<span class="bold">${data.userId}</span>`, '删除用户', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        })
        const { userId } = data
        await deleteUser({ userId })
        this.$message({ type: 'success', message: '删除成功' })
        this.getData()
      } catch (err) {
        err !== 'cancel' && console.log(err)
      }
    }
  }
}
</script>

