<template>
  <div class="censorship">
    <el-dialog
      title="审查用户"
      :visible.sync="shouldShow"
      width="850px"
      :close-on-click-modal="false"
    >
      <div class="censor-box">
        <div class="censor-switch">
          <div class="flex">
            <div class="switch-item">
              <span>活动标题</span>
              <el-switch v-model="switchMap.switchTitle" />
            </div>
            <div class="switch-item">
              <span>活动内容</span>
              <el-switch v-model="switchMap.switchContent" />
            </div>
            <div class="switch-item">
              <span>活动类型</span>
              <el-switch v-model="switchMap.switchType" />
            </div>
          </div>
        </div>
        <transition-group name="fade">
          <div v-show="switchMap.switchTitle" key="title" class="censor-item flex title">
            <div class="label">活动标题</div>
            <div class="flexable">
              <el-input v-if="editMap.editTitle" v-model="useData.checkTitle" />
              <div v-else v-text="useData.checkTitle" />
            </div>
            <div class="censor-btnGroup">
              <el-button type="success" icon="el-icon-edit-outline" size="mini" circle @click="showTitleInput" />
              <el-button type="danger" icon="el-icon-close" size="mini" circle @click="deleteTitle" />
            </div>
          </div>
          <div v-show="switchMap.switchContent" key="content" class="censor-item flex content">
            <div class="label">活动内容</div>
            <div class="flexable">
              <el-input
                v-if="editMap.editContent"
                v-model="useData.checkContent"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 15}"
              />
              <div v-else v-text="useData.checkContent" />
            </div>
            <div class="censor-btnGroup">
              <el-button type="success" icon="el-icon-edit-outline" size="mini" circle @click="showContentInput" />
              <el-button type="danger" icon="el-icon-close" size="mini" circle @click="deleteContent" />
            </div>
          </div>
          <div v-show="switchMap.switchType" key="type" class="censor-item flex type">
            <div class="label">活动类型</div>
            <div class="flexable">
              <el-input v-if="editMap.editType" v-model="useData.activityType" />
              <div v-else v-text="useData.activityType" />
            </div>
            <div class="censor-btnGroup">
              <el-button type="success" icon="el-icon-edit-outline" size="mini" circle @click="showTypeInput" />
              <el-button type="danger" icon="el-icon-close" size="mini" circle @click="deleteType" />
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
import { agreeTitle, agreeContent, agreeActivityType, agreeActivity, failActivity } from '@/api/contentMgr'
import { checkedText } from '@/utils/const'
export default {
  props: {
    getParams: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const { checkTitle, checkContent, activityType } = this.getParams
    return {
      useData: { checkTitle, checkContent, activityType },
      shouldShow: true,
      switchMap: {
        switchTitle: true,
        switchContent: true,
        switchType: true
      },
      editMap: {
        editTitle: false,
        editContent: false,
        editType: false
      },
      loadingMap: {
        censorLoading: false
      },
      statusMap: {
        title: false,
        content: false,
        type: false
      }
    }
  },
  watch: {
    shouldShow(value) {
      value === false && this.$emit('update:visible', value)
    }
  },
  created() {
    const { title, content, activityType } = this.getParams
    this.statusMap.title = title !== '(内容审核中)'
    this.statusMap.content = content !== '(内容审核中)'
    this.statusMap.type = activityType !== '待审核'
    this.switchMap.switchTitle = !this.statusMap.title
    this.switchMap.switchContent = !this.statusMap.content
    this.switchMap.switchtype = !this.statusMap.type
  },
  methods: {
    handleDialogClose() {
      this.shouldShow = false
      this.$emit('emitFunc', { function: 'getData', arguments: [] })
    },
    showTitleInput() {
      this.editMap.editTitle = true
    },
    deleteTitle() {
      this.useData.checkTitle = checkedText
    },
    showContentInput() {
      this.editMap.editContent = true
    },
    deleteContent() {
      this.useData.checkContent = checkedText
    },
    showTypeInput() {
      this.editMap.editType = true
    },
    deleteType() {
      this.useData.activityType = checkedText
    },
    async handleCensorBtnClick() {
      try {
        this.loadingMap.censorLoading = true
        const task = []
        this.switchMap.switchTitle && task.push(this.censorshipTitle())
        this.switchMap.switchContent && task.push(this.censorshipContent())
        this.switchMap.switchType && task.push(this.censorshipType())
        await Promise.all(task)
        Object.values(this.statusMap).every(status => status) && await this.passActivity()
        this.handleDialogClose()
        this.$message({ type: 'success', message: '审查结果保存成功' })
      } catch (err) {
        console.log(err)
      } finally {
        this.loadingMap.censorLoading = false
      }
    },
    async censorshipTitle(data) {
      const activityId = this.getParams.id
      const title = this.useData.checkTitle
      await agreeTitle({ activityId, title })
      this.statusMap.title = true
    },
    async censorshipContent() {
      const activityId = this.getParams.id
      const content = this.useData.checkContent
      await agreeContent({ activityId, content })
      this.statusMap.content = true
    },
    async censorshipType() {
      const activityId = this.getParams.id
      const type = this.useData.activityType
      await agreeActivityType({ activityId, type })
      this.statusMap.type = true
    },
    async passActivity() {
      const activityId = this.getParams.id
      await agreeActivity({ activityId })
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
