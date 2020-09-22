<template>
  <div class="operationMgr-label">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="默认标签" name="default">
        <pane-default ref="default" />
      </el-tab-pane>
      <el-tab-pane lazy label="自定义标签" name="manual">
        <pane-manual ref="manual" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tableCommon from '@/mixins/tableCommon'
import paneDefault from './default'
import paneManual from './manual'
export default {
  components: { paneDefault, paneManual },
  mixins: [tableCommon],
  data() {
    return {
      activeName: 'default'
    }
  }
}
</script>

<style lang="scss">
.operationMgr-label{
  .el-tab-pane{
    height: calc( 100vh - 150px);
  }
}
</style>
