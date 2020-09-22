<template>
  <el-dropdown class="update-activity-status" trigger="click" @command="handleBtnClick">
    <i
      v-loading="loadingMap.updateUserLoading"
      class="el-icon-arrow-down el-icon--right pointer"
      element-loading-spinner="el-icon-loading"
    />
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="passUser">通过</el-dropdown-item>
      <el-dropdown-item command="failUserStatus">不通过</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { agreeUser, failUser } from '@/api/contentMgr'
export default {
  props: {
    userId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loadingMap: {
        updateUserLoading: false
      }
    }
  },
  methods: {
    async handleBtnClick(command) {
      try {
        this.loadingMap.updateUserLoading = true
        await this[command]()
        this.$emit('emitFunc', { function: 'initModule', arguments: [] })
      } catch (err) {
        console.error(err)
      } finally {
        this.loadingMap.updateUserLoading = false
      }
    },
    async passUser() {
      const { userId } = this
      await agreeUser({ userId })
    },
    async failUserStatus() {
      const { userId } = this
      await failUser({ userId })
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
