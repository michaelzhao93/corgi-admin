<template>
  <div class="flex align-center">
    <el-tooltip
      :class="['mar-r-10', isChecked && 'pointer']"
      placement="bottom"
      :disabled="!isChecked"
      :content="activityInfo.checkContent"
    >
      <span class="mar-r-10" v-text="activityInfo.content || '--'" />
    </el-tooltip>
    <el-button v-show="isChecked" class="btn-mini-s flex-static" type="success" icon="el-icon-check" circle @click="agreeCheck" />
    <el-button class="btn-mini-s flex-static" type="danger" icon="el-icon-close" circle @click="failCheck" />
  </div>
</template>

<script>
import { agreeContent } from '@/api/contentMgr'
import { autoCheckText, checkedText } from '@/utils/const'
export default {
  props: {
    activityInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isChecked() {
      return this.activityInfo.content === autoCheckText
    }
  },
  methods: {
    async agreeCheck() {
      try {
        const activityId = this.activityInfo.id
        const content = this.activityInfo.checkContent
        await agreeContent({ activityId, content })
        this.$emit('emitFunc', { function: 'initModule', arguments: [] })
      } catch (err) {
        err !== 'cancel' && console.error(err)
      }
    },
    async failCheck() {
      try {
        await this.$msgbox.confirm(`确定要进行该操作`, `删除活动内容`, {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const activityId = this.activityInfo.id
        const content = checkedText
        await agreeContent({ activityId, content })
        this.$emit('emitFunc', { function: 'initModule', arguments: [] })
      } catch (err) {
        err !== 'cancel' && console.error(err)
      }
    }
  }
}
</script>
