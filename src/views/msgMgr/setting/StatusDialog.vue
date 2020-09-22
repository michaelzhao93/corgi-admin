<template>
  <el-dialog
    title="发送消息设置"
    :visible.sync="show"
    width="600px"
    top="30vh"
    :close-on-click-modal="false"
    @open="initModule"
  >

      <div class="detail-dialog-wrap">
        <vue-scroll>
          <el-form
            ref="form"
            :model="useData"
            label-width="140px"
          >
            <el-form-item label="发送时间" prop="id">

    <el-radio-group v-model="reportStatus">
      <el-radio
        v-for="(option, index) of statusOptions"
        :key="`status-option-${index}`"
        :label="option.label"
      >{{ option.text }}</el-radio>
    </el-radio-group>

         </el-form-item>
            <el-form-item label="" prop="id">
                        <el-date-picker
            v-if="reportStatus==='time'"
            v-model="useData.startTime"
            type="datetime"
                      style="width:50%;margin-left:10px;"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
            placeholder="选择日期时间">
    </el-date-picker> 
         </el-form-item>
        <el-form-item label="" prop="id">
         </el-form-item>
      <el-form-item label="圈人发送" prop="id">
         </el-form-item>
        <el-form-item label="发送类型" prop="id">
    <el-radio-group v-model="searchtatus">
      <el-radio
        v-for="(option, index) of search"
        :key="`status-option-${index}`"
        :label="option.label"
      >{{ option.text }}</el-radio>
    </el-radio-group>
         </el-form-item>


            <el-form-item label="" prop="id">
        <el-input
          v-model="useData.ruleValue"
          name="ruleValue"
          v-if="searchtatus==='nickname'||searchtatus==='userId'"
          tabindex="1"
          placeholder="请输入昵称\ID" 
          style="width:50%;"
          auto-complete="off"
        />     
         </el-form-item>



              </el-form>

 
      <div class="search-btnGroup flex" style="width:15%;margin-left:40%;margin-top:60px;" >
      <el-button size="mini" @click="handleDialogClose">关闭</el-button>
      <el-button type="primary" size="mini" @click="submitReportStatus">完成</el-button>
    </div>     




        </vue-scroll>
             </div>
  </el-dialog>
</template>
<script type="text/javascript" src="../lib/vue.js"></script>
<script type="text/javascript" src="../lib/elementui/index.js"></script>
<script type="text/javascript">
import { update_system_message } from '@/api/msgMgr'
import { visible } from '@/mixins/commonSet'
import dateRangePicker from '../components/dateRangePicker'
import tableCommon from '@/mixins/tableCommon'

export default {
  mixins: [tableCommon,visible],
  props: {
    useData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      statusOptions: [
        { label: 'now', text: '立即发送' },
        { label: 'time', text: '设置发送时间' },
               { label: 'off', text: '暂不发送' }
      ],
      reportStatus: 'now',
      search: [
        { label: 'all', text: '全部' },
        { label: 'nickname', text: '昵称筛选' },
        { label: 'userId', text: 'ID筛选' }
      ],
      searchtatus: 'all'
    }
  },
  methods: {
    initModule() {
      this.reportStatus = 'now'
      this.searchtatus = 'all'
    },
    async submitReportStatus(data) {
      try {

        let status = "created"
        const messageId = this.useData.id

        let time = new Date(this.useData.startTime).getTime();
        let nowtime = new Date().getTime();


        time = time - nowtime;

        if(time<0)
        {
          time = 0;
        }
        let sentTime = this.useData.sentTime;
        if(this.reportStatus=="now")
                sentTime = 0
        if(this.reportStatus=="time")
                sentTime = time;
        if(this.reportStatus=="off")
                status = "disabled";
        const title = this.useData.title
        const content = this.useData.content
      let rules = [
      {
        ruleKey: this.searchtatus,
        ruleValue: this.useData.ruleValue
      }]
      if(this.searchtatus=="all")
      {
        rules = null;
      }
        let data = ({ id:messageId,content: content, status: status, sentTime: sentTime, title: title, rules: rules});
          console.log(data);

        await update_system_message( data )
        this.handleDialogClose()
        this.$emit('emitFunc', { function: 'getData', arguments: [] })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style>

</style>
