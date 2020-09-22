<template>
  <div class="dialog-activity">
    <el-dialog
      title="活动详情"
      top="8vh"
      :visible.sync="show"
      width="600px"
      :close-on-click-modal="false"
      @open="getUserInfo"
    >
      <div class="detail-dialog-wrap">
        <vue-scroll>
          <el-form
            ref="form"
            :model="useData"
            label-width="120px"
          >
            <el-form-item label="用户昵称" prop="userId">
              <span v-text="nickname || '--'" />
            </el-form-item>
            <el-form-item label="活动ID" prop="id">
              <span v-text="useData.id || '--'" />
            </el-form-item>
            <el-form-item label="活动标题" prop="title">
              <span v-text="useData.title || '--'" />
            </el-form-item>
            <el-form-item label="活动类型" prop="activityType">
              <span v-text="useData.activityType || '--'" />
            </el-form-item>
            <el-form-item label="审核状态" prop="checkStatus">
              <checkstatus :status="useData.checkStatus" />
            </el-form-item>
            <el-form-item label="活动地址" prop="address">
              <span v-text="(useData.city + useData.adname + useData.address) || '--'" />
            </el-form-item>
            <el-form-item label="最大人数" prop="peopleCount">
              <span v-text="useData.peopleCount || '--'" />
            </el-form-item>
            <el-form-item label="活动内容" prop="content">
              <span v-text="useData.content || '--'" />
            </el-form-item>
            <el-form-item label="活动开始时间" prop="signUpTime">
              <span v-text="useData.signUpTime || '--'" />
            </el-form-item>
            <el-form-item label="支付方式" prop="payType">
              <span v-text="useData.payType || '--'" />
            </el-form-item>
            <el-form-item label="创建时间" prop="createTime">
              <span v-text="useData.createTime || '--'" />
            </el-form-item>
            <el-form-item label="最后更新时间" prop="updateTime">
              <span v-text="useData.updateTime || '--'" />
            </el-form-item>
            <el-form-item label="活动状态" prop="role">
              <activitystatus :status="useData.status" />
            </el-form-item>
            <el-form-item label="活动照片" prop="pics">
              <div v-viewer="{movable: true}" class="info-imgBox">
                <el-badge
                  v-for="(img, index) of useData.pics"
                  :key="`detail-activity-img-${index}`"
                  class="img-item"
                  :value="parseImageStatusText(img.status)"
                  :type="parseImageStatusType(img.status)"
                >
                  <img v-lazy="img.picUrl">
                </el-badge>
              </div>
            </el-form-item>
          </el-form>
        </vue-scroll>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryUser } from '@/api/contentMgr'
import Activitystatus from '@/components/Activitystatus'
import Checkstatus from '@/components/Checkstatus'
import { parseImageStatus, visible } from '@/mixins/commonSet'

export default {
  components: { Activitystatus, Checkstatus },
  mixins: [parseImageStatus, visible],
  props: {
    useData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      nickname: ''
    }
  },
  methods: {
    async getUserInfo() {
      try {
        if (this.useData.userId) {
          const params = {
            userId: this.useData.userId,
            page: 1,
            pageSize: 10
          }
          const data = await queryUser(params)
          this.nickname = data.hasOwnProperty('data') && Array.isArray(data.data) ? data.data[0].nickname : '--'
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss">
.dialog-activity{
  .el-form-item__content{
    padding-left: 20px !important;
  }
}
</style>
