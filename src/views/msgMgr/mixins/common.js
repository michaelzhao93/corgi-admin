import { searchCommon } from '@/mixins/commonSet'
export default {
  mixins: [searchCommon],
  watch: {
    $route() {
      this.reload()
    }
  },
  mounted() {
    this.$nextTick(() => this.addTabelHeightListener('parent'))
    this.reload()
  },
  methods: {
    sortUserId: (a, b) => a.userId - b.userId,
    searchData() {
      this.resetPagination()
    },
    reload() {
      const { params: { shouldChangeForm, rewriteForm }} = this.$route
      shouldChangeForm && Object.entries(rewriteForm).forEach(([key, value]) => this.$set(this.searchForm, key, value))
      this.getData()
    }
  }
}
