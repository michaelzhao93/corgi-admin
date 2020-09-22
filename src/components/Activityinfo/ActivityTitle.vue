<template>
  <div class="flex align-center">
    <el-tooltip
      :class="['mar-r-10', isChecked && 'pointer']"
      placement="bottom"
      :disabled="!isChecked"
      :content="activityInfo.checkTitle"
    >
      <span class="mar-r-10" v-text="activityInfo.title || '--'" />
    </el-tooltip>
    <el-button v-show="isChecked" class="btn-mini-s flex-static" type="success" icon="el-icon-check" circle @click="agreeCheck" />
    <el-button class="btn-mini-s flex-static" type="danger" icon="el-icon-close" circle @click="failCheck" />
  </div>
</template>

<script>
import { agreeTitle } from '@/api/contentMgr'
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
      return this.activityInfo.title === autoCheckText
    }
  },
  methods: {
    async agreeCheck() {
      try {
        const activityId = this.activityInfo.id
        const title = this.activityInfo.checkTitle
        await agreeTitle({ activityId, title })
        this.$emit('emitFunc', { function: 'initModule', arguments: [] })
      } catch (err) {
        err !== 'cancel' && console.error(err)
      }
    },
    async failCheck() {
      try {
        await this.$msgbox.confirm(`确定要进行该操作`, `删除活动标题`, {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const activityId = this.activityInfo.id
        const title = checkedText
        await agreeTitle({ activityId, title })
        this.$emit('emitFunc', { function: 'initModule', arguments: [] })
      } catch (err) {
        err !== 'cancel' && console.error(err)
      }
    }
  }
}
</script>
