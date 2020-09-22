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
        <el-button type="primary" v-if="chartRadio=='推荐页banner'" @click="handleAddMember({})">新增推荐页banner</el-button>
        <el-button type="primary" v-if="chartRadio=='活动页banner'" @click="handleAddMember({})">新增活动页banner</el-button>

            </div>


             <div class="flex search-bar">
                       <div class="search-btnGroup flex">
                <el-radio-group
        v-model="chartRadio"
        class="radio-group"
        size="mini"
        @change="handleRadioChange"
      >
        <el-radio-button label="推荐页banner"></el-radio-button>
                <el-radio-button label="活动页banner"></el-radio-button>
      </el-radio-group>
            </div>
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
      <el-table-column sortable label="ID" align="center" prop="id"> </el-table-column>

            <el-table-column width="220" height="80" label="banner图片" align="center" prop="picUrl">
        <template slot-scope="scope">
          <img width="120" height="80" v-lazy="scope.row.picUrl" class="avator-img">
        </template>
      </el-table-column>


      <el-table-column  label="备注" align="center" prop="title" :formatter="formatColumn" />

      <el-table-column   label="状态" align="center" prop="state" :formatter="formatColumn" />
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




            <el-table-column label="banner顺序" align="center" width="200">
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
import { list_banner,update_banner,delete_banner} from '@/api/contentMgr'
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

                let status = "";
                let type = '';
                if(this.chartRadio =='推荐页banner')
                {
                  type = "recommend";
                }
                if(this.chartRadio =='活动页banner')
                {
                  type = "activity";
                }
        const data = await list_banner({status,type})
                console.log(data)

        this.tableData = data.data.map(item => {



          switch (item.urlType) {
                    case "1":
                      item.radio = 'URL外链';
                        break;
                    case "2":
                        item.radio = '活动详情';
                        break;
                    case "3":
                        item.radio = '商户详情';
                        break;
                    default:
                    }



          item.state = item.status == 0? '禁用':'启用'
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
   handleRadioChange(value) {
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
