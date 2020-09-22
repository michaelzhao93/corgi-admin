<template>
  <div class="censorship">
    <el-dialog
      title="审查用户"
      :visible.sync="shouldShow"
      width="600px"
      :close-on-click-modal="false"
    >
      <div class="censor-box">
        <div class="censor-switch">
          <div class="flex">
            <div class="switch-item">
              <span>用户昵称</span>
              <el-switch v-model="switchMap.switchNickname" />
            </div>
            <div class="switch-item">
              <span>用户描述</span>
              <el-switch v-model="switchMap.switchDesc" />
            </div>
          </div>
        </div>
        <transition-group name="fade">
          <div v-show="switchMap.switchNickname" key="nickname" class="censor-item flex nickname">
            <div class="label">用户昵称</div>
            <div class="flexable">
              <el-input v-if="editMap.editNickname" v-model="useData.checkNickname" />
              <div v-else v-text="useData.checkNickname" />
            </div>
            <div class="censor-btnGroup">
              <el-button type="primary" icon="el-icon-edit-outline" size="mini" circle @click="showNicknameInput" />
              <el-button type="danger" icon="el-icon-close" size="mini" circle @click="deleteNickname" />
            </div>
          </div>
          <div v-show="switchMap.switchDesc" key="desc" class="censor-item flex desc">
            <div class="label">用户描述</div>
            <div class="flexable">
              <el-input
                v-if="editMap.editDesc"
                v-model="useData.checkDesc"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 10}"
              />
              <div v-else v-text="useData.checkDesc" />
            </div>
            <div class="censor-btnGroup">
              <el-button type="primary" icon="el-icon-edit-outline" size="mini" circle @click="showDescInput" />
              <el-button type="danger" icon="el-icon-close" size="mini" circle @click="deleteDesc" />
            </div>
          </div>
        </transition-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose">取 消</el-button>
        <el-button :loading="loadingMap.censorLoading" type="primary" @click="handleCensorBtnClick">完成审核</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { agreeNickname, agreeDesc, agreeUser } from '@/api/contentMgr'
import { checkedText } from '@/utils/const'
export default {
  props: {
    getParams: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const { checkNickname, checkDesc } = this.getParams
    return {
      useData: { checkNickname, checkDesc },
      shouldShow: true,
      switchMap: {
        switchNickname: true,
        switchDesc: true
      },
      editMap: {
        editNickname: false,
        editDesc: false
      },
      loadingMap: {
        censorLoading: false
      },
      statusMap: {
        nickname: false,
        desc: false
      }
    }
  },
  watch: {
    shouldShow(value) {
      value === false && this.$emit('update:visible', value)
    }
  },
  created() {
    const { nickname, desc } = this.getParams
    this.statusMap.nickname = nickname !== '(内容审核中)'
    this.statusMap.desc = desc !== '(内容审核中)'
    this.switchMap.switchNickname = !this.statusMap.nickname
    this.switchMap.switchDesc = !this.statusMap.desc
  },
  methods: {
    handleDialogClose() {
      this.shouldShow = false
      this.$emit('emitFunc', { function: 'getData', arguments: [] })
    },
    showNicknameInput() {
      this.editMap.editNickname = true
    },
    deleteNickname() {
      this.useData.checkNickname = checkedText
    },
    showDescInput() {
      this.editMap.editDesc = true
    },
    deleteDesc() {
      this.useData.checkDesc = checkedText
    },
    async handleCensorBtnClick() {
      try {
        this.loadingMap.censorLoading = true
        const task = []
        this.switchMap.switchNickname && task.push(this.censorshipNickname())
        this.switchMap.switchDesc && task.push(this.censorshipDesc())
        await Promise.all(task)
        this.$message({ type: 'success', message: '审查结果保存成功' })
        Object.values(this.statusMap).every(status => status) && await this.updateUserStatus()
        this.handleDialogClose()
      } catch (err) {
        console.log(err)
      } finally {
        this.loadingMap.censorLoading = false
      }
    },
    async censorshipNickname(data) {
      const { userId } = this.getParams
      const nickname = this.useData.checkNickname
      await agreeNickname({ userId, nickname })
      this.statusMap.nickname = true
    },
    async censorshipDesc() {
      const { userId } = this.getParams
      const desc = this.useData.checkDesc
      await agreeDesc({ userId, desc })
      this.statusMap.desc = true
    },
    async updateUserStatus() {
      const { userId } = this.getParams
      await agreeUser({ userId })
    }
  }
}
</script>

<style lang="scss" scoped>
.censor-box{
  .censor-switch{
    margin-bottom: 30px;
    padding: 0 20px;
    .switch-item{
      margin-right: 30px;
    }
  }
  .censor-item{
    margin-top: 20px;
    flex-wrap:nowrap;
    justify-content:space-between;
    >*{
      line-height: 36px;
    }
    .label{
      flex: 0 0 100px;
      text-align: right;
      padding-right: 20px;
    }
    .censor-btnGroup{
      margin-left: 20px;
      flex: 0 0 60px;
    }
    .el-button{
      padding: 3px !important;
    }
  }
}
</style>
