<template>
  <div class="keep-analyse">
      <div class="title-container">
        <h5 class="title">性格</h5>
      </div>
    <el-table
      :ref="tableRef"
      
      v-loading="loadingMap.tableLoading"
      :data="tableData"
      @cell-dblclick="tableDbEdit"
      :border="true"
      style="width: 100%"
      :header-cell-style="{textAlign:'center'}"
      :height="tableHeight"
      :cell-style="getColumnStyle"
    >
      <el-table-column  label="性格" align="center" prop="role" fixed />
      <el-table-column
        v-for="item of keepColumn"
        :key="`column-keepday-${item.keepDay}`"
        :label="item.label"
        align="center"
        :prop="item.keepDay"
      />


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
import { get_match_factor,update_match_factor,refresh_all_match } from '@/api/matchMgr'
import pageConfig from './pageConfig'
export default {
  mixins: [tableCommon, searchCommon],
  data() {
    return {
      ...pageConfig,
      pickerOptions,
      extraHeight: 0,


       keepColumn: [
        { label: 'ESTJ', keepDay: 'ESTJ' },
        { label: 'ESTP', keepDay: 'ESTP' },
        { label: 'ESFJ', keepDay: 'ESFJ' },
        { label: 'ESFP', keepDay: 'ESFP' },
        { label: 'ENTJ', keepDay: 'ENTJ' },
        { label: 'ENTP', keepDay: 'ENTP' },
        { label: 'ENFJ', keepDay: 'ENFJ' },
        { label: 'ENFP', keepDay: 'ENFP' },
        { label: 'ISTJ', keepDay: 'ISTJ' },
        { label: 'ISTP', keepDay: 'ISTP' },
        { label: 'ISFJ', keepDay: 'ISFJ' },
        { label: 'ISFP', keepDay: 'ISFP' },
        { label: 'INTJ', keepDay: 'INTJ' },
        { label: 'INTP', keepDay: 'INTP' },
        { label: 'INFJ', keepDay: 'INFJ' },
        { label: 'INFP', keepDay: 'INFP' }
      ],
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
          if (column.label != "性格") {
            event.target.innerHTML = "";
            let cellInput = document.createElement("input");
            cellInput.value = "";
            cellInput.setAttribute("type", "number");
            cellInput.style.width = "70%";
            cell.appendChild(cellInput);
            cellInput.onblur = function() {
              cell.removeChild(cellInput);
              event.target.innerHTML = cellInput.value;
              let ctr1 = ""
              let ctr2 = ""
              
                      const temp = {  }

          temp.cn1 = "ctr1";
          temp.cv1 = row.role;
          temp.cn2 = "ctr2";
          temp.cv2 = column.label;
          temp.match = cellInput.value;
          temp.table = "character"
                    console.log(temp);
          const res = update_match_factor(temp);
            };
          }
    },

    async getPageData() {
        try {
          this.loadingMap.tableLoading = true
          const table = 'character';
          const keepData = await get_match_factor({table});
          const temp = {  }
                        console.log(keepData);

          temp.a = "ESTJ";
          temp.b = "ESTP";
          temp.c = "ESFJ";
          temp.d = "ESFP";
          temp.e = "ENTJ";
          temp.f = "ENTP";
          temp.g = "ENFJ";
          temp.h = "ENFP";
          temp.i = "ISTJ";
          temp.j = "ISTP";
          temp.k = "ISFJ";
          temp.l = "ISFP";
          temp.m = "INTJ";
          temp.n = "INTP";
          temp.o = "INFJ";
          temp.p = "INFP";

          let common_table_info = [];
          let a = 0;
          for (let i in temp)
          {
           common_table_info.push({role:temp[i],ESTJ:keepData.data[0+(16*a)].match,ESTP:keepData.data[1+(16*a)].match,ESFJ:keepData.data[2+(16*a)].match,ESFP:keepData.data[3+(16*a)].match,ENTJ:keepData.data[4+(16*a)].match
           ,ENTP:keepData.data[5+(16*a)].match,ENFJ:keepData.data[6+(16*a)].match,ENFP:keepData.data[7+(16*a)].match,ISTJ:keepData.data[8+(16*a)].match,ISTP:keepData.data[9+(16*a)].match
           ,ISFJ:keepData.data[10+(16*a)].match,ISFP:keepData.data[11+(16*a)].match,INTJ:keepData.data[12+(16*a)].match,INTP:keepData.data[13+(16*a)].match,INFJ:keepData.data[14+(16*a)].match
           ,INFP:keepData.data[15+(16*a)].match});
           a++
          }
          // for(let i in temp)
          // {
          //   common_table_info.push({role:temp[i],a1:keepData.data[0+(16*a)].match,a7:keepData.data[1+(16*a)].match,a5:keepData.data[2+(16*a)].match,a3:keepData.data[3+(16*a)].match,a0:keepData.data[4+(16*a)].match});
          //   a++;
          // }
          console.log(common_table_info)

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