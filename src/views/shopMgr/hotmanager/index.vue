<template>
  <div class="contentMgr-avator">
    <div class="flex search-bar">
      <el-form
        class="flex-wrap filter"
      >
        <!-- <el-form-item class="flex filter-item" label="用户ID" prop="userId">
          <el-input v-model="searchForm.activityId" type="text" placeholder="请输入用户ID" />
        </el-form-item> -->
             <!-- <div class="flex search-bar">
                       <div class="search-btnGroup flex">
        <el-button type="primary" @click="handleAddMember({})">新增热门活动</el-button>
            </div>

      </div> -->
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
      <el-table-column label="活动ID" align="center" prop="activityId"> </el-table-column>


      <el-table-column  label="商户活动名称" align="center" prop="activityName" :formatter="formatColumn" />

      <el-table-column   label="展示区域" align="center" prop="area" :formatter="formatColumn" />
      <el-table-column  label="投放地区" align="center" prop="city" :formatter="formatColumn" />
      <el-table-column  label="投放开始时间" align="center" prop="startTime" :formatter="formatColumn" />
      <el-table-column  label="投放结束时间" align="center" prop="endTime" :formatter="formatColumn" />
      <el-table-column  label="状态" align="center" prop="state" :formatter="formatColumn" />
      <el-table-column sortable label="顺序" align="center" prop="order" :formatter="formatColumn" />


      <el-table-column label="操作" align="center" width="230">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="handleAddMember(scope.row)"
          >编辑</el-button>
          <el-button
            type="danger"
            size="mini"
            v-if="scope.row.state=='禁用'"
            @click="checkPicPass(true,scope.row)"
          >启用</el-button>
                    <el-button
            type="danger"
            size="mini"
            v-if="scope.row.state=='启用'"
            @click="checkPicPass(false,scope.row)"
          >禁用</el-button>
          <el-button
            type="info"
            size="mini"
            @click="checkPicRefuse(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
      </el-table-column>




            <el-table-column label="顺序" align="center" width="150">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="updateOrder(true,scope.row)"
          >向后</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="updateOrder(false,scope.row)"
          >向前</el-button>
        </template>
      </el-table-column>
    </el-table>
            <detail :use-data="catchedData" :visible.sync="visibleMap.detailDiaVisible"  @emitFunc="acceptEmitFunc"/>

  </div>
</template>

<script>
import { list_hot_activity,delete_hot_activity, update_hot_activity,get_detail} from '@/api/shopMgr'
import Censorshipstatus from '@/components/Censorshipstatus'
import Userid from '@/components/Userid'
import tableCommon from '@/mixins/tableCommon'
import Detail from './Detail'
import contentMgrCommon from '../mixins/common'
import { allCensorshipTypes } from '@/utils/const'
import { parseImageStatus, emit } from '@/mixins/commonSet'
import pageConfig from './pageConfig'
export default {
  components: { Censorshipstatus,Detail,Userid },
  mixins: [tableCommon, contentMgrCommon,emit],

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
      try {

        const data = await list_hot_activity({})
                console.log(data)

        this.tableData = data.data.map(item => {



          item.state = item.status == 0? '禁用':'启用'
          if(item.city=='全国')
          {
                                  item.radio = '全国';
          }
          else{
                                              item.radio = '活动当地';
          }



    //  let userId = 0
    //         let activityId = item.activityId;
    //       const data1 = get_detail({userId,activityId});
    //                       console.log(data1)
          item.area = '热门活动'
          return item
        })
      } catch (err) {
        console.log(err)
      }
    },
    async checkPicPass(enable,scope) {
      
         let id = scope.id
            let barId = scope.barId
      let activityId = scope.activityId
            let activityName = scope.activityName
      let startTime =  scope.startTime;
      let endTime =  scope.endTime;
      let order =  scope.order;
      let type = 'recommend';
      let city = scope.city;
      let status = enable ? '1': '0'

    
      let data = ({ id:id,barId: barId, activityId: activityId,activityName: activityName, startTime: startTime, endTime: endTime, order: order, status: status, type: type,city: city});
      update_hot_activity(data);      console.log(data)
      this.getData();
            this.getData();
    },

    async updateOrder(enable,scope) {
      

      let id = scope.id
            let barId = scope.barId
      let activityId = scope.activityId
      let startTime =  scope.startTime;
      let activityName = scope.activityName
      let endTime =  scope.endTime;
      let order =  scope.order;
      let status =  scope.status;
      let type = 'recommend';
      let city = scope.city;
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
      let data = ({ id:id,activityName:activityName,barId: barId, activityId: activityId, startTime: startTime, endTime: endTime, order: order, status: status, type: type,city: city});
      console.log(data)
      update_hot_activity(data);
      this.getData();
            this.getData();

    },
   handleRadioChange(value) {
     this.getData();
    },

    async handleAddMember(data) {
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
        let hotId = scope.id;

        await delete_hot_activity({ hotId })
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
