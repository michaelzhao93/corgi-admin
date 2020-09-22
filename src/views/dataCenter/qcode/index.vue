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
        <el-button type="primary" @click="handleAddMember({})">生成二维码</el-button>
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
      <el-table-column sortable label="活动名称/用户名" align="center" prop="user">

      </el-table-column>
      <el-table-column  label="扫描次数" align="center" prop="count" :formatter="formatColumn" />

    </el-table>
        <detail :use-data="catchedData" :visible.sync="visibleMap.detailDiaVisible"  @emitFunc="acceptEmitFunc"/>
  </div>
</template>

<script>
import { get_influencer} from '@/api/dataCenter'
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
        const data = await get_influencer({})
                console.log(data)

        this.tableData = data.data;
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
