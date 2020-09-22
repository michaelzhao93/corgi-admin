<template>
  <div class="add-topic">
    <el-dialog
      title="添加话题"
      :visible.sync="shouldShow"
      width="600px"
      :close-on-click-modal="false"
      @open="initModule"
      @close="handleDialogOnClose"
    >
      <div class="wrap">
        <el-form
          ref="form"
          :model="form"
          label-width="120px"
          :rules="formRules"
        >
          <el-form-item label="话题名称" prop="topic">
            <el-input v-model="form.topic" />
          </el-form-item>
          <el-form-item label="话题内容" prop="content">
            <el-input v-model="form.content" type="textarea" :autosize="{ minRows: 4, maxRows: 15}" />
          </el-form-item>
          <!-- <el-form-item v-show="actionType === 'edit'" label="话题状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择话题状态">
              <el-option
                v-for="status of allTopicStatus"
                :key="status.value"
                :label="status.label"
                :value="status.value"
              />
            </el-select>
          </el-form-item> -->
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose">取 消</el-button>
        <el-button
          v-show="actionType==='add'"
          :loading="loadingMap.addBtnLoading"
          type="primary"
          @click="handleAddTopic"
        >添加</el-button>
        <el-button
          v-show="actionType==='edit'"
          :loading="loadingMap.addBtnLoading"
          type="primary"
          @click="handleEditTopic"
        >修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addTopic, updateTopic } from '@/api/operationMgr'
import { allTopicStatus } from '@/utils/const'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    actionType: {
      type: String,
      default: 'add'
    },
    useData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      allTopicStatus,
      shouldShow: false,
      defaultForm: {
        topic: '',
        content: '',
        status: 'created'
      },
      form: {},
      formRules: {
        topic: [
          { required: true, message: '请输入话题名称', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入话题内容', trigger: 'blur' }
        ]
      },
      loadingMap: {
        addBtnLoading: false
      }
    }
  },
  watch: {
    visible(value) {
      if (value === true) {
        this.shouldShow = true
      }
    },
    shouldShow(value) {
      value === false && this.$emit('update:visible', value)
    }
  },
  methods: {
    initModule() {
      if (this.actionType === 'add') {
        this.form = this.$common.deepCopy(this.defaultForm)
      } else if (this.actionType === 'edit') {
        const { topic, content, status } = this.useData
        this.form = { topic, content, status }
      }
      this.$nextTick(() => this.$refs.form.clearValidate())
    },
    handleDialogClose() {
      this.shouldShow = false
    },
    handleDialogOnClose() {
      this.$emit('emitFunc', { function: 'getData', arguments: [] })
    },
    async handleAddTopic() {
      try {
        this.loadingMap.addBtnLoading = true
        await addTopic({ ...this.form })
        this.handleDialogClose()
        this.$message({ type: 'success', message: '添加成功' })
      } catch (err) {
        console.log(err)
      } finally {
        this.loadingMap.addBtnLoading = false
      }
    },
    async handleEditTopic() {
      try {
        this.loadingMap.addBtnLoading = true
        const { topicId } = this.useData
        const opuid = -1
        await updateTopic({ ...this.form, topicId, opuid })
        this.handleDialogClose()
        this.$message({ type: 'success', message: '修改成功' })
      } catch (err) {
        console.log(err)
      } finally {
        this.loadingMap.addBtnLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
