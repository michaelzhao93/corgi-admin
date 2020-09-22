<template>
  <div class="topic">
    <el-form :ref="searchRef" class="flex-wrap filter" :model="searchForm">
      <el-form-item class="flex filter-item" label="话题名称" prop="text">
        <el-input v-model="searchForm.text" type="text" />
      </el-form-item>
      <el-form-item class="flex filter-item" label="话题状态" prop="status">
        <el-select v-model="searchForm.status" placeholder="请选择话题状态">
          <el-option
            v-for="status of allTopicStatus"
            :key="status.value"
            :label="status.label"
            :value="status.value"
          />
        </el-select>
      </el-form-item>
      <div class="btn-group">
        <el-button type="primary" @click="getData">搜索</el-button>
        <el-button type="primary" @click="resetForm">重置</el-button>

      </div>
    </el-form>
    <el-row class="btn-group">
      <el-button type="primary" @click="showAddTopic">新建话题</el-button>
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
      <el-table-column sortable label="话题名称" align="center" prop="topic" />
      <el-table-column sortable label="话题内容" align="center" prop="content" min-width="200" />
      <el-table-column sortable label="话题创建时间" align="center" prop="ctime" />
      <el-table-column sortable label="话题更新时间" align="center" prop="uptime" />
      <el-table-column sortable label="话题状态" align="center" prop="status" width="150">
        <template slot-scope="scope">
          <topicstatus :status="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <div v-if="scope.row.status === 'release'">
            <el-button type="warning" size="mini" @click="offTopic(scope.row)">下架</el-button>
          </div>
          <div v-else>
            <el-button type="success" size="mini" @click="releaseTopic(scope.row)">发布</el-button>
            <el-button type="info" size="mini" @click="showEditTopic(scope.row)">编辑</el-button>
            <!-- <el-button type="danger" size="mini" @click="deleteTopic(scope.row)">删除</el-button> -->
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- <paginationtpl :pagination="pagination" :pagination-total="paginationTotal" /> -->
    <add-topic
      :visible.sync="visibleMap.addTopicVisible"
      :action-type="actionType"
      :use-data="catchedData"
      @emitFunc="acceptEmitFunc"
    />
  </div>
</template>

<script>
import { getTopics, updateTopic } from '@/api/operationMgr'
import Topicstatus from '@/components/Topicstatus'
import addTopic from './addTopic'
import tableCommon from '@/mixins/tableCommon'
import { emit, resetPage } from '@/mixins/commonSet'
import { allTopicStatus } from '@/utils/const'
export default {
  components: { addTopic, Topicstatus },
  mixins: [tableCommon, emit, resetPage],
  data() {
    return {
      allTopicStatus,
      extraHeight: 130,
      refMap: {
        searchRef: 'searchForm'
      },
      searchForm: {
        status: '',
        text: ''
      },
      visibleMap: {
        addTopicVisible: false
      },
      actionType: 'add'
    }
  },
  mounted() {
    this.addTabelHeightListener('parent')
  },
  methods: {
    async getData() {
      try {
        this.loadingMap.tableLoading = true
        const data = await getTopics({ ...this.searchForm })
        this.tableData = data.data
      } catch (err) {
        console.log(err)
      } finally {
        this.loadingMap.tableLoading = false
      }
    },
    showAddTopic() {
      this.actionType = 'add'
      this.catchedData = {}
      this.visibleMap.addTopicVisible = true
    },
    showEditTopic(data) {
      this.actionType = 'edit'
      this.catchedData = data
      this.visibleMap.addTopicVisible = true
    },
    async offTopic(data) {
      try {
        const { topic, content, topicId } = data
        const status = 'off'
        const opuid = -1
        await updateTopic({ topic, content, topicId, status, opuid })
        this.$message({ type: 'success', message: '下架成功' })
        this.getData()
      } catch (err) {
        console.log(err)
      }
    },
    async releaseTopic(data) {
      try {
        const { topic, content, topicId } = data
        const status = 'release'
        const opuid = -1
        await updateTopic({ topic, content, topicId, status, opuid })
        this.$message({ type: 'success', message: '上架成功' })
        this.getData()
      } catch (err) {
        console.log(err)
      }
    },
    async deleteTopic(data) {
      try {
        await this.$msgbox.confirm(`确定删除话题：<span class="bold">${data.topic}</span>`, '删除话题', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        })
        this.$message({ type: 'success', message: '删除话题成功' })
        this.getData()
      } catch (err) {
        console.log(err)
      }
    },
    resetForm() {
      this.$refs[this.searchRef].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.topic{
  .btn-group{
    margin-bottom: 20px;
    margin-left: 20px;
  }
  .fuzzySearchBtn{
    margin-left: 5px;
  }
}
</style>
