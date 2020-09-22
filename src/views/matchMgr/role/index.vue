<template>
  <div class="keep-analyse">
      <div class="title-container">
        <h5 class="title">角色</h5>
      </div>
    <el-table
      :ref="tableRef"
      
      v-loading="loadingMap.tableLoading"
      :data="tableData"
      @cell-dblclick="tableDbEdit"
      :border="true"
      style="width: 100%"
      :header-cell-style="{textAlign:'center'}"
      :height=300
      :cell-style="getColumnStyle"
    >
      <el-table-column  label="角色" align="center" prop="role" fixed />
      <el-table-column  label="1" align="center" prop="a1"  />
      <el-table-column  label="0.5偏1" align="center" prop="a7" />
      <el-table-column  label="0.5" align="center" prop="a5"  />
      <el-table-column  label="0.5偏0" align="center" prop="a3"  />
      <el-table-column  label="0" align="center" prop="a0"  />


    </el-table>
          <div class="title-container">
        <h5 class="text">双击数字进行修改，全部修改完毕后手动点击“更新数据”按钮进行数据更新</h5>
        <el-button type="primary" style="width:10%;margin-left:45%;margin-top:20px;" size="small" @click="UpdateData">更新数据</el-button>
      </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/tableCommon'
import { searchCommon } from '@/mixins/commonSet'
import { getStatistics, getUserStay } from '@/api/dataCenter'
import { pickerOptions, keepColumnStyle } from '@/utils/const'
import { get_match_factor,update_match_factor ,refresh_all_match} from '@/api/matchMgr'
import pageConfig from './pageConfig'
export default {
  mixins: [tableCommon, searchCommon],
  data() {
    return {
      ...pageConfig,
      pickerOptions,
      extraHeight: 0,
      loadingMap: {
        tableLoading: false
      }
    }
  },
  beforeMount() {
    this.$nextTick(() => {
      this.addTabelHeightListener('parent')
      this.getPageData()
    })
  },
  methods: {
    generateData(params) {
      console.log(params)
      const { startDate, endDate, stayCount } = Object.entries(params).reduce((data, [key, value]) => {
        data[key] = key === 'stayCount' ? value : this.$day(value)
        return data
      }, {})
      const diff = Math.abs(startDate.diff(endDate, 'day'))
      return Array(diff).fill('').map((item, index) => {
        const loginDate = startDate.add(index, 'day')
        let count = Math.floor(Math.random() * 1000)
        return Array(Number(stayCount) + 1).fill('').map((keep, keepIndex) => {
          count = parseInt(count * (1 - Math.floor(Math.random() * 30) / 100))
          return {
            loginDate: loginDate.format('YYYY-MM-DD'),
            stayDate: loginDate.add(keepIndex, 'day').format('YYYY-MM-DD'),
            stayCount: keepIndex,
            count
          }
        })
      }).flat(Infinity)
    },
    UpdateData() {
      console.log("update");
          refresh_all_match();
          this.$message({ type: 'success', message: '更新成功' })
    },
    tableDbEdit(row, column, cell, event) {
      
          console.log(row, column, cell, event);
          if (column.label != "角色") {
            event.target.innerHTML = "";
            let cellInput = document.createElement("input");
            cellInput.value = "";
            cellInput.setAttribute("type", "number");
            cellInput.style.width = "70%";
            cell.appendChild(cellInput);
            cellInput.onblur = function() {
              cell.removeChild(cellInput);
              event.target.innerHTML = cellInput.value;
              let role1 = ""
              let role2 = ""
              if(row.role == "0")
              {
                role1 = "0"
              }
              if(row.role == "0.5")
              {
                role1 = "0.5"
              }
              if(row.role == "1")
              {
                role1 = "1"
              }
              if(row.role == "0.5偏0")
              {
                role1 = "0.5-"
              }
              if(row.role == "0.5偏1")
              {
                role1 = "0.5+"
              }
              if(column.label == "0")
              {
                role2 = "0"
              }
              if(column.label == "0.5")
              {
                role2 = "0.5"
              }
              if(column.label == "1")
              {
                role2 = "1"
              }
              if(column.label== "0.5偏0")
              {
                role2 = "0.5-"
              }
              if(column.label== "0.5偏1")
              {
                role2 = "0.5+"
              }
                      const temp = {  }

          temp.cn1 = "role1";
          temp.cv1 = role1;
          temp.cn2 = "role2";
          temp.cv2 = role2;
          temp.match = cellInput.value;
          temp.table = "role"
          const res = update_match_factor(temp);
                        console.log(temp);
            };
          }
    },

    async getPageData() {
        try {
          this.loadingMap.tableLoading = true
          const table = 'role';
          const keepData = await get_match_factor({table});
          const temp = {  }

          temp.a1 = "1";
          temp.a7 = "0.5偏1";
          temp.a5 = "0.5偏0";
          temp.a3 = "0";
          temp.a0 = "0.5";
          let common_table_info = [];
          let a = 0;
          for(let i in temp)
          {
            common_table_info.push({role:temp[i],a1:keepData.data[0+(5*a)].match,a7:keepData.data[1+(5*a)].match,a5:keepData.data[2+(5*a)].match,a3:keepData.data[3+(5*a)].match,a0:keepData.data[4+(5*a)].match});
            a++;
          }
          this.tableData = common_table_info;

               } catch (err) {
          console.log(err)
          this.tableData = []
        } finally {
          this.loadingMap.tableLoading = false
        }
      
    },
    
    getColumnStyle({ row, column, rowIndex, columnIndex }) {
      const value = row[column.property]
      if (typeof value === 'number' && row.base !== 0) {
        const persent = (value / row.base * 100).toFixed(1)
        const check = keepColumnStyle.find(item => persent >= item.min && persent <= item.max)
        return check && {
          backgroundColor: check.background,
          color: check.color || '#000'
        }
      }
    } 
  }

}


</script>
<style lang="scss" scoped>
$bg:rgba(255, 255, 255,1);
$dark_gray:#889aa4;
$light_gray:#454545;


  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $light_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 10px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

        .text {
      font-size: 12px;
      color: $light_gray;
      margin: 10px auto 0px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $light_gray;
    cursor: pointer;
    user-select: none;
  }

</style>