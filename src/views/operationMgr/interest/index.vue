<template>
  <div class="operationMgr-interest">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="默认兴趣" name="default">
        <pane-default ref="default" />
      </el-tab-pane>
      <el-tab-pane lazy label="自定义兴趣" name="manual">
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
.operationMgr-interest{
  .el-tab-pane{
    height: calc( 100vh - 150px);
  }
}
</style>
