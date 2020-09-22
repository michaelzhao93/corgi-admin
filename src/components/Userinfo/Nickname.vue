<template>
  <div class="flex align-center">
    <el-tooltip
      :class="['mar-r-10', isChecked && 'pointer']"
      placement="bottom"
      :disabled="!isChecked"
      :content="userInfo.checkNickname"
    >
      <span class="mar-r-10" v-text="userInfo.nickname || '--'" />
    </el-tooltip>
    <el-button v-show="isChecked" class="btn-mini-s flex-static" type="success" icon="el-icon-check" circle @click="agreeCheck" />
    <el-button class="btn-mini-s flex-static" type="danger" icon="el-icon-close" circle @click="failCheck" />
  </div>
</template>

<script>
import { agreeNickname, failUser } from '@/api/contentMgr'
import { autoCheckText, checkedText } from '@/utils/const'
export default {
  props: {
    userInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isChecked() {
      return this.userInfo.nickname === autoCheckText
    }
  },
  methods: {
    async agreeCheck() {
      try {
        const { userId } = this.userInfo
        const nickname = this.userInfo.checkNickname
        await agreeNickname({ userId, nickname })
        this.$emit('emitFunc', { function: 'initModule', arguments: [] })
      } catch (err) {
        err !== 'cancel' && console.error(err)
      }
    },
    async failCheck() {
      try {
        await this.$msgbox.confirm(`确定要进行该操作`, `删除用户昵称`, {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await this.failUserStatus()
        const { userId } = this.userInfo
        const nickname = checkedText
        await agreeNickname({ userId, nickname })
        this.$emit('emitFunc', { function: 'initModule', arguments: [] })
      } catch (err) {
        err !== 'cancel' && console.error(err)
      }
    },
    async failUserStatus() {
      const { userId } = this.userInfo
      await failUser({ userId })
    }
  }
}
</script>
