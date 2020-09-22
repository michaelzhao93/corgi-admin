<template>
  <div class="dialog-activityInfo">
    <el-drawer
      title="活动详情"
      :visible.sync="show"
      size="40%"
      @open="initModule"
    >
      <div v-loading="loadingMap.dialogLoading" class="wrap">
        <vue-scroll>
          <el-form
            ref="form"
            :model="activityInfo"
            class="form-wrap"
            label-width="120px"
          >
            <el-form-item label="用户昵称" prop="userId">
              <span v-text="activityUserInfo.nickname || '--'" />
            </el-form-item>
            <el-form-item label="活动ID" prop="id">
              <span v-text="activityInfo.id || '--'" />
            </el-form-item>
            <el-form-item label="活动标题" prop="title">
              <activity-title :activity-info="activityInfo" @emitFunc="acceptEmitFunc" />
            </el-form-item>
            <el-form-item label="活动类型" prop="activityType">
              <activity-type :activity-info="activityInfo" @emitFunc="acceptEmitFunc" />
            </el-form-item>
            <el-form-item label="审核状态" prop="checkStatus">
              <div class="horizontal v-mid-all">
                <checkstatus :status="activityInfo.checkStatus" />
                <update-activity-status :activity-id="activityInfo.id" @emitFunc="acceptEmitFunc" />
              </div>
            </el-form-item>
            <el-form-item label="活动地址" prop="address">
              <span v-text="(activityInfo.city + activityInfo.adname + activityInfo.address) || '--'" />
            </el-form-item>
            <el-form-item label="最大人数" prop="peopleCount">
              <span v-text="activityInfo.peopleCount || '--'" />
            </el-form-item>
            <el-form-item label="活动内容" prop="content">
              <activity-content :activity-info="activityInfo" @emitFunc="acceptEmitFunc" />
            </el-form-item>
            <el-form-item label="活动开始时间" prop="signUpTime">
              <span v-text="activityInfo.signUpTime || '--'" />
            </el-form-item>
            <el-form-item label="支付方式" prop="payType">
              <span v-text="activityInfo.payType || '--'" />
            </el-form-item>
            <el-form-item label="创建时间" prop="createTime">
              <span v-text="activityInfo.createTime || '--'" />
            </el-form-item>
            <el-form-item label="最后更新时间" prop="updateTime">
              <span v-text="activityInfo.updateTime || '--'" />
            </el-form-item>
            <el-form-item label="活动状态" prop="role">
              <activitystatus :status="activityInfo.status" />
            </el-form-item>
            <el-form-item label="活动照片" prop="pics">
              <div v-viewer="{movable: true}" class="info-imgBox">
                <el-badge
                  v-for="(img, index) of activityInfo.pics"
                  :key="`detail-activity-img-${index}`"
                  class="img-item"
                  :value="parseImageStatusText(img.status)"
                  :type="parseImageStatusType(img.status)"
                  @mouseenter.native="deleteMouseIndex = index"
                  @mouseleave.native="deleteMouseIndex = 9998"
                >
                  <deleteimage
                    type="activity"
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
import Deleteimage from '@/components/Deleteimage'
import Checkstatus from '@/components/Checkstatus'
import Activitystatus from '@/components/Activitystatus'
import ActivityTitle from './ActivityTitle'
import ActivityContent from './ActivityContent'
import ActivityType from './ActivityType'
import UpdateActivityStatus from './UpdateActivityStatus'
import { parseImageStatus, emit } from '@/mixins/commonSet'

export default {
  components: {
    Checkstatus,
    Activitystatus,
    Deleteimage,
    ActivityTitle,
    ActivityType,
    ActivityContent,
    UpdateActivityStatus
  },
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
      'activityShow': 'activityShow',
      'activityInfo': 'activityInfo',
      'activityUserInfo': 'activityUserInfo'
    })
  },
  watch: {
    show(value) {
      !value && this.setShow(false)
    },
    activityShow(value) {
      this.show = !!value
    }
  },
  methods: {
    ...mapMutations('activityInfo', {
      'setShow': 'SET_SHOW'
    }),
    ...mapActions('activityInfo', {
      'getActivityInfo': 'getActivityInfo'
    }),
    async initModule() {
      try {
        this.loadingMap.dialogLoading = true
        await this.getActivityInfo()
      } catch (err) {
        console.log(err)
      } finally {
        this.loadingMap.dialogLoading = false
      }
    },
    handleDialogClose() {
      this.show = false
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
.dialog-activityInfo{
  .el-form-item__content{
    padding-left: 20px !important;
  }
}
</style>
