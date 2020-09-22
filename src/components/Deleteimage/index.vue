<template>
  <div class="delete-image">
    <transition name="fade">
      <el-button v-show="shouldShow" type="danger" icon="el-icon-delete" circle size="mini" @click="handleBtnclick" />
    </transition>
  </div>
</template>

<script>
import { deleteUserPic, deleteActivityPic } from '@/api/contentMgr'
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    picId: {
      type: String,
      default: ''
    },
    mouseIndex: {
      type: Number,
      default: 9999
    },
    itemIndex: {
      type: Number,
      default: 9998
    }
  },
  data() {
    return {
      functionType: {
        user: 'deleteUserImage',
        activity: 'deleteActivityImage'
      }
    }
  },
  computed: {
    shouldShow() {
      return this.mouseIndex === this.itemIndex
    }
  },
  methods: {
    async handleBtnclick() {
      try {
        await this.$msgbox.confirm(`确定要删除该图片`, '删除图片', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
        this[this.functionType[this.type]]()
        this.$emit('emitFunc', { function: 'initModule', arguments: [] })
      } catch (err) {
        err !== 'cancel' && console.error(err)
      }
    },
    async deleteUserImage() {
      const { picId } = this
      console.log(this.type);
      await deleteUserPic({ picId })
    },
    async deleteActivityImage() {
      const { picId } = this
            //console.log(this.type);

      await deleteActivityPic({ picId })
    }
  }
}
</script>

<style lang="scss" scoped>
.delete-image{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
