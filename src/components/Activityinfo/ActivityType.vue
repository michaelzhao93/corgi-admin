<template>
  <div class="flex align-center">
    <el-tooltip
      :class="['mar-r-10', isChecked && 'pointer']"
      placement="bottom"
      :disabled="!isChecked"
      :content="activityInfo.checkActivityType"
    >
      <activitytype-tag class="mar-r-10" :type="activityInfo.activityType" />
    </el-tooltip>
    <el-button v-show="isChecked" class="btn-mini-s flex-static" type="success" icon="el-icon-check" circle @click="agreeCheck" />
    <el-button class="btn-mini-s flex-static" type="danger" icon="el-icon-close" circle @click="failCheck" />
  </div>
</template>

<script>
import ActivitytypeTag from '@/components/ActivitytypeTag'
import { agreeActivityType } from '@/api/contentMgr'

export default {
  components: { ActivitytypeTag },
  props: {
    activityInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isChecked() {
      return this.activityInfo.activityType === '待审核'
    }
  },
  methods: {
    async agreeCheck() {
      try {
        const activityId = this.activityInfo.id
        const type = this.activityInfo.checkActivityType
        await agreeActivityType({ activityId, type })
        this.$emit('emitFunc', { function: 'initModule', arguments: [] })
      } catch (err) {
        err !== 'cancel' && console.error(err)
      }
    },
    async failCheck() {
      try {
        await this.$msgbox.confirm(`确定要进行该操作`, `删除活动类型`, {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const activityId = this.activityInfo.id
        const type = '违规'
        await agreeActivityType({ activityId, type })
        this.$emit('emitFunc', { function: 'initModule', arguments: [] })
      } catch (err) {
        err !== 'cancel' && console.error(err)
      }
    }
  }
}
</script>
