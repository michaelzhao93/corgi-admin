<template>
  <div class="dialog-userinfo">
    <el-drawer
      title="用户详情"
      :visible.sync="show"
      size="40%"
      @open="initModule"
    >
      <div v-loading="loadingMap.dialogLoading" class="wrap">
        <vue-scroll>
          <el-form
            ref="form"
            :model="userInfo"
            class="form-wrap"
            label-width="120px"
          >
            <el-form-item label="用户ID" prop="userId">
              <span v-text="userInfo.userId || '--'" />
            </el-form-item>
            <el-form-item label="用户昵称" prop="nickname">
              <nickname :user-info="userInfo" @emitFunc="acceptEmitFunc" />
            </el-form-item>
            <el-form-item label="用户描述" prop="desc">
              <userdesc :user-info="userInfo" @emitFunc="acceptEmitFunc" />
            </el-form-item>
            <el-form-item label="审核状态" prop="checkStatus">
              <div class="horizontal v-mid-all">
                <checkstatus :status="userInfo.checkStatus" />
                <updateUserStatus :user-id="userInfo.userId" @emitFunc="acceptEmitFunc" />
              </div>
            </el-form-item>
            <el-form-item label="联系方式" prop="telNo">
              <span v-text="userInfo.telNo || '--'" />
            </el-form-item>
            <el-form-item label="角色" prop="role">
              <span v-text="userInfo.role || '--'" />
            </el-form-item>
            <el-form-item label="所属类型" prop="group">
              <span v-text="userInfo.group || '--'" />
            </el-form-item>
            <el-form-item label="星座" prop="con">
              <span v-text="userInfo.con || '--'" />
            </el-form-item>
            <el-form-item label="在线时间" prop="time">
              <span v-text="$day(userInfo.time).format('YYYY-MM-DD HH:mm:ss')" />
            </el-form-item>
            <el-form-item label="活动照片" prop="pics">
              <div v-viewer="{movable: true}" class="info-imgBox">
                <el-badge
                  v-for="(img, index) of userInfo.pics"
                  :key="`detail-userInfo-img-${index}`"
                  class="img-item"
                  :value="parseImageStatusText(img.status)"
                  :type="parseImageStatusType(img.status)"
                  @mouseenter.native="deleteMouseIndex = index"
                  @mouseleave.native="deleteMouseIndex = 9998"
                >
                  <deleteimage
                    type="user"
                    :pic-id="img.picId"
                    :mouse-index="deleteMouseIndex"
                    :item-index="index"
                    @emitFunc="acceptEmitFunc"
                  />
                  <img v-lazy="img.picUrl">
                </el-badge>
              </div>
            </el-form-item>
          </el-form>
        </vue-scroll>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Checkstatus from '@/components/Checkstatus'
import Deleteimage from '@/components/Deleteimage'
import Nickname from './Nickname'
import Userdesc from './Userdesc'
import UpdateUserStatus from './UpdateUserStatus'
import { parseImageStatus, emit } from '@/mixins/commonSet'
import { agreeNickname, agreeDesc } from '@/api/contentMgr'
import { checkedText } from '@/utils/const'

export default {
  components: { Nickname, Userdesc, UpdateUserStatus, Checkstatus, Deleteimage },
  mixins: [parseImageStatus, emit],
  data() {
    return {
      show: false,
      loadingMap: {
        dialogLoading: true
      },
      deleteMouseIndex: null
    }
  },
  computed: {
    ...mapGetters({
      'userShow': 'userShow',
      'userInfo': 'userInfo'
    })
  },
  watch: {
    show(value) {
      !value && this.setShow(false)
    },
    userShow(value) {
      this.show = !!value
    }
  },
  methods: {
    ...mapMutations('userInfo', {
      'setShow': 'SET_SHOW'
    }),
    ...mapActions('userInfo', {
      'getUserInfo': 'getUserInfo'
    }),
    async initModule() {
      try {
        this.loadingMap.dialogLoading = true
        await this.getUserInfo()
      } catch (err) {
        console.log(err)
      } finally {
        this.loadingMap.dialogLoading = false
      }
    },
    handleDialogClose() {
      this.show = false
    },
    async recheck(type, shouldDo) {
      try {
        await this.$msgbox.confirm(`确定要进行该操作`, `删除${type}`, {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await this[shouldDo]()
        this.initModule()
      } catch (err) {
        err !== 'cancel' && console.error(err)
      }
    },
    async clearNickname() {
      const { userId } = this.userInfo
      const nickname = checkedText
      await agreeNickname({ userId, nickname })
    },
    async clearDesc() {
      const { userId } = this.userInfo
      const desc = checkedText
      await agreeDesc({ userId, desc })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  box-sizing: border-box;
  height: calc(100vh - 80px);
  padding-bottom: 30px;
  .form-wrap{
    padding-right: 30px;
  }
}
</style>
<style lang="scss">
.dialog-userinfo{
  .el-form-item__content{
    padding-left: 20px !important;
  }
}
</style>
