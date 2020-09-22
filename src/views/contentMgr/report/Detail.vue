<template>
  <div class="dialog-report">
    <el-dialog
      title="举报详情"
      top="8vh"
      :visible.sync="show"
      width="600px"
      :close-on-click-modal="false"
    >
      <div class="detail-dialog-wrap">
        <vue-scroll>
          <el-form
            ref="form"
            :model="useData"
            label-width="140px"
          >
            <el-form-item label="举报编号" prop="id">
              <span v-text="useData.id || '--'" />
            </el-form-item>
            <el-form-item label="举报人ID" prop="reportUserId">
              <userid :id="useData.reportUserId" />
            </el-form-item>
            <el-form-item label="举报人昵称" prop="reportUserName">
              <span v-text="useData.reportUserName || '--'" />
            </el-form-item>
            <el-form-item label="被举报用户/活动ID" prop="accuseId">
              <span :is="allReportType[useData.accuseType]" :id="useData.accuseId" />
            </el-form-item>
            <el-form-item label="举报类型" prop="accuseType">
              <span v-text="useData.accuseType || '--'" />
            </el-form-item>
            <el-form-item label="举报标题" prop="accuseName">
              <span v-text="useData.accuseName || '--'" />
            </el-form-item>
            <el-form-item label="举报说明" prop="desc">
              <span v-text="useData.desc || '--'" />
            </el-form-item>
            <el-form-item label="举报原因" prop="reason">
              <span v-text="useData.reason || '--'" />
            </el-form-item>
            <el-form-item label="举报处理状态" prop="reportStatus">
              <report-status :status="useData.reportStatus" />
            </el-form-item>
            <el-form-item label="创建时间" prop="ctime">
              <span v-text="useData.ctime || '--'" />
            </el-form-item>
            <el-form-item label="更新时间" prop="uptime">
              <span v-text="useData.uptime || '--'" />
            </el-form-item>
            <el-form-item label="上传图片" prop="pics">
              <div v-viewer="{movable: true}" class="flex report-img">
                <img
                  v-for="(imgUrl, index) of useData.pics"
                  :key="`detail-report-img-${index}`"
                  v-lazy="imgUrl"
                  class="img-item"
                >
              </div>
            </el-form-item>
          </el-form>
        </vue-scroll>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { allReportType } from '@/utils/const'
import ReportStatus from '@/components/ReportStatus'
import Userid from '@/components/Userid'
import Activityid from '@/components/Activityid'
import { visible } from '@/mixins/commonSet'
export default {
  components: { ReportStatus, Userid, Activityid },
  mixins: [visible],
  props: {
    useData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      allReportType
    }
  }
}
</script>

<style lang="scss">
.dialog-report{
  .el-form-item__content{
    padding-left: 20px !important;
  }
  .report-img{
    padding: 10px;
    overflow-x: auto;
    flex-wrap: nowrap;
    .img-item{
      margin-right: 30px;
      line-height: 1em;
      height: 100px;
      width: auto;
    }
  }
}
</style>
