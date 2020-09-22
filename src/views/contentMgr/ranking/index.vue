<template>
  <div class="specify-role chart-simple">
    <div class="chart">
      <div class="chart-filter flex-wrap">
        <div class="time-range-wrap flex">
          <date-range-picker :time-range.sync="baseTime" :default-today="true" />
          <el-button class="getChartData" type="primary" size="small" @click="handleRadioChange">搜索</el-button>
        </div>
      </div>
      <div class="page-desc">{{ $route.meta.title }}：每日推荐榜单管理。</div>
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
      <el-table-column sortable label="ID" align="center" prop="userId"> </el-table-column>
      <el-table-column  label="昵称" align="center" prop="nickname" :formatter="formatColumn" />

            <el-table-column width="120" height="100" label="头像" align="center" prop="avatar">
        <template slot-scope="scope">
          <img width="80" height="80" v-lazy="scope.row.avatar" class="avator-img">
        </template>
      </el-table-column>


      <el-table-column  label="日期" align="center" prop="date" :formatter="formatColumn" />

      <el-table-column   label="上榜次数" align="center" prop="count" :formatter="formatColumn" />


      <el-table-column label="操作" align="center" width="130">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="handleAddMember(scope.row)"
          >替换</el-button>
        </template>
      </el-table-column>

    </el-table>
            <detail :use-data="catchedData" :visible.sync="visibleMap.detailDiaVisible"  @emitFunc="acceptEmitFunc"/>
  </div>
</template>

<script>
import { get_by_date,update_banner,delete_banner} from '@/api/contentMgr'
import Censorshipstatus from '@/components/Censorshipstatus'
import Userid from '@/components/Userid'
import Detail from './Detail'
import tableCommon from '@/mixins/tableCommon'
import contentMgrCommon from '../mixins/common'
import { allCensorshipTypes } from '@/utils/const'
import { parseImageStatus, emit } from '@/mixins/commonSet'
import pageConfig from './pageConfig'
import specifyCommon from '../mixins/specifyCommon'

export default {
  components: { Censorshipstatus, Detail,Userid },
  mixins: [tableCommon, contentMgrCommon,emit,specifyCommon],
   data() {
    return {
      allCensorshipTypes,
      chartRadio:"推荐页banner",
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
       const [startDate, endDate] = this.baseTime.map(item => this.$day(item).format('YYYY-MM-DD'))

      try {


        const data = await get_by_date({startDate,endDate})
                console.log(data)

        this.tableData = data.data.map(item => {
          return item
        })
      } catch (err) {
        console.log(err)
      }
    },
    async checkPicPass(enable,scope) {
      
      let title =  scope.title;
      let url =  scope.url;
      let order =  scope.order;
      let status = enable ? '1': '0'

      let type = scope.type;
      let picUrl  = scope.picUrl;
      let urlType = scope.urlType;
      let id = scope.id;
      let data = ({ id:id,title: title, url: url, order: order, status: status, type: type, picUrl: picUrl, urlType: urlType});
      console.log(data)
      update_banner(data);
      this.getData();
            this.getData();
    },

    async updateOrder(enable,scope) {
      
      let title =  scope.title;
      let url =  scope.url;
      let order =  scope.order;
      let status = scope.status;

      let type = scope.type;
      let picUrl  = scope.picUrl;
      let urlType = scope.urlType;
      let id = scope.id;

      if(enable)
      {
        let num = parseInt(order);
        num++;
        order = (num).toString();
      }
      else
      {
        if(order=='1')
        {
          return;
        }
        let num = parseInt(order);
        num--;
        order = (num).toString();
              }
      let data = ({ id:id,title: title, url: url, order: order, status: status, type: type, picUrl: picUrl, urlType: urlType});
      console.log(data)
      update_banner(data);
      this.getData();
            this.getData();

    },
   handleRadioChange() {
     this.getData();
    },

    async handleAddMember(data) {
      this.catchedData = data
      this.catchedData.typelable = this.chartRadio
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
        let bannerId = scope.id;

        await delete_banner({ bannerId })
        this.$message({ type: 'success', message: '操作成功' })
        this.getData()
              this.getData();

      } catch (err) {
        err !== 'cancel' && console.log(err)
      }
    }
  }
}
</script>
