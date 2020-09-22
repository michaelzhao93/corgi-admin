<template>
  <el-dropdown class="update-activity-status" trigger="click" @command="handleBtnClick">
    <i
      v-loading="loadingMap.updateActivityLoading"
      class="el-icon-arrow-down el-icon--right pointer"
      element-loading-spinner="el-icon-loading"
    />
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="passActivity">通过</el-dropdown-item>
      <el-dropdown-item command="failActivity">不通过</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { agreeActivity, failActivity } from '@/api/contentMgr'
export default {
  props: {
    activityId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loadingMap: {
        updateActivityLoading: false
      }
    }
  },
  methods: {
    async handleBtnClick(command) {
      try {
        this.loadingMap.updateActivityLoading = true
        await this[command]()
        this.$emit('emitFunc', { function: 'initModule', arguments: [] })
      } catch (err) {
        console.error(err)
      } finally {
        this.loadingMap.updateActivityLoading = false
      }
    },
    async passActivity() {
      const { activityId } = this
      await agreeActivity({ activityId })
    },
    async failActivity() {
      const { activityId } = this
      await failActivity({ activityId })
    }
  }
}
</script>

<style lang="scss">
.update-activity-status{
  .el-loading-spinner{
    top: 0 !important;
    margin-top: 0 !important;
  }
}
</style>
