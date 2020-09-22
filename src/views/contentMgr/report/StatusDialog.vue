<template>
  <el-dialog
    title="举报处理完成"
    :visible.sync="show"
    width="600px"
    top="30vh"
    :close-on-click-modal="false"
    @open="initModule"
  >
    <el-radio-group v-model="reportStatus">
      <el-radio
        v-for="(option, index) of statusOptions"
        :key="`status-option-${index}`"
        :label="option.label"
      >{{ option.text }}</el-radio>
    </el-radio-group>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleDialogClose">关闭</el-button>
      <el-button type="primary" size="mini" @click="submitReportStatus">处理完成</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateReportStatus } from '@/api/contentMgr'
import { visible } from '@/mixins/commonSet'
export default {
  mixins: [visible],
  props: {
    useData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      statusOptions: [
        { label: 'normal', text: '正常' },
        { label: 'checked', text: '有问题' }
      ],
      reportStatus: 'normal'
    }
  },
  methods: {
    initModule() {
      this.reportStatus = 'normal'
    },
    async submitReportStatus(data) {
      try {
        const reportId = this.useData.id
        const status = this.reportStatus
        await updateReportStatus({ reportId, status })
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
