import Paginationtpl from '@/components/Paginationtpl/index'
export default {
  components: { Paginationtpl },
  data() {
    return {
      pagination: {
        page: 1,
        pageSize: 10
      },
      paginationTotal: 0
    }
  },
  watch: {
    pagination: {
      handler() {
        this.getData()
      },
      deep: true
    }
  },
  methods: {
    resetPagination() {
      this.pagination = {
        page: 1,
        pageSize: 10
      }
    }
  }
}
