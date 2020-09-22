<template>
  <div class="keep-analyse">
      <div class="title-container">
        <h5 class="title">身材</h5>
      </div>
    <el-table
      :ref="tableRef"
      
      v-loading="loadingMap.tableLoading"
      :data="tableData"
      @cell-dblclick="tableDbEdit"
      :border="true"
      style="width: 100%"
      :header-cell-style="{textAlign:'center'}"
      :height=400
      :cell-style="getColumnStyle"
    >
      <el-table-column  label="身材" align="center" prop="role" fixed />
      <el-table-column  label="偏瘦" align="center" prop="monkey"  />
      <el-table-column  label="精壮" align="center" prop="wolf" />
      <el-table-column  label="匀称" align="center" prop="papio"  />
      <el-table-column  label="肌肉" align="center" prop="muscle"  />
      <el-table-column  label="肉壮" align="center" prop="bear"  />
      <el-table-column  label="偏胖" align="center" prop="pig"  />


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
          if (column.label != "身材") {
            event.target.innerHTML = "";
            let cellInput = document.createElement("input");
            cellInput.value = "";
            cellInput.setAttribute("type", "number");
            cellInput.style.width = "70%";
            cell.appendChild(cellInput);
            cellInput.onblur = function() {
              cell.removeChild(cellInput);
              event.target.innerHTML = cellInput.value;
              let group1 = row.role;
              let group2 = column.label;
              
                      const temp = {  }

          temp.cn1 = "group1";
          temp.cv1 = group1;
          temp.cn2 = "group2";
          temp.cv2 = group2;
          temp.match = cellInput.value;
          temp.table = "group"
          const res = update_match_factor(temp);
                        console.log(temp);
            };
          }
    },

    async getPageData() {
        try {
          this.loadingMap.tableLoading = true
          const table = 'group';
          const keepData = await get_match_factor({table});
          const temp = {  }

          temp.monkey = "偏瘦";
          temp.wolf = "精壮";
          temp.papio = "匀称";
          temp.muscle = "肌肉";
          temp.bear = "肉壮";
          temp.pig = "偏胖";
          let common_table_info = [];
          let a = 0;
          for(let i in temp)
          {
            common_table_info.push({role:temp[i],monkey:keepData.data[0+(6*a)].match,wolf:keepData.data[1+(6*a)].match,papio:keepData.data[2+(6*a)].match,muscle:keepData.data[3+(6*a)].match,bear:keepData.data[4+(6*a)].match,pig:keepData.data[5+(6*a)].match});
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