<template>
  <el-pagination
    class="main_pagination"
    :current-page="pagination.page"
    :page-sizes="paginationSet.size"
    :page-size="pagination.pageSize"
    :layout="paginationSet.layout"
    :total="paginationTotal"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>
<script>
import { paginationSetDefault } from '@/utils/const'
export default {
  props: {
    pagination: {
      type: Object,
      default: () => {}
    },
    paginationTotal: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    const paginationSet = this.$common.deepCopy(paginationSetDefault)
    return {
      paginationSet
    }
  },
  methods: {
    handleSizeChange(pageSize) {
      this.pagination.pageSize = pageSize
    },
    handleCurrentChange(page) {
      this.pagination.page = page
    }
  }
}
</script>

<style>

</style>
