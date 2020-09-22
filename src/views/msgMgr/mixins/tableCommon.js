import pagination from './pagination'
export default {
  mixins: [pagination],
  data() {
    return {
      refMap: {
        table: 'mainTable'
      },
      tableData: [],
      catchedDataArr: [],
      catchedData: {},
      catchedRadio: null,
      tableSelected: false,
      tableHeight: 200,
      extraHeight: 110,
      loadingMap: {
        tableLoading: false
      },
      visibleMap: {
        tableVisible: false
      },
      renderMap: {
        tableRender: false
      },
      switchMap: {
        getDataOnRender: true
      }
    }
  },
  computed: {
    isTableRadioSelected() {
      return Object.keys(this.catchedData).length
    },
    isTableCheckBoxSelected() {
      return this.catchedDataArr.length > 0
    }
  },
  mounted() {
    if (Reflect.has(this, 'getData') && this.switchMap.getDataOnRender) {
      this.getData()
    }
  },
  watch: {
    'loadingMap.tableLoading'(value) {
      if (!value) {
        this.$nextTick(() => {
          const ref = this.$refs[this.refMap.table]
          ref && ref.doLayout()
        })
      }
    }
  },
  methods: {
    handleTableCheckBoxSelect(catchedDataArr) {
      this.catchedDataArr = catchedDataArr
      this.tableSelected = this.$refs[this.refMap.table].selection.length > 0
    },
    handleTabelRadioClick(index) {
      this.catchedRadio = index
      this.catchedData = this.tableData[index]
    },
    handleTableItemClick(catchedData) {
      this.catchedData = catchedData
    },
    setTableHeightBySelf() {
      // 以自身容器高度设置table高度
      const { minTableHeight = 0 } = this
      const searchBar = this.$refs[this.searchRef]
      const searchBarHei = searchBar && searchBar.$el.clientHeight || 0
      const newHeight = (this.$el.clientHeight - this.extraHeight - searchBarHei)
      this.tableHeight = newHeight < minTableHeight ? minTableHeight : newHeight
    },
    setTableHeightByParent() {
      // 以父级容器高度设置table高度
      const { minTableHeight = 0 } = this
      const searchBar = this.$refs[this.searchRef]
      const searchBarHei = searchBar && searchBar.$el.clientHeight || 0
      const newHeight = (this.$parent.$el.clientHeight - this.extraHeight - searchBarHei)
      this.tableHeight = newHeight < minTableHeight ? minTableHeight : newHeight
    },
    watchResizeFinish(fn, timer) {
      clearTimeout(timer)
      timer = setTimeout(() => new Promise(resolve => {
        this.renderMap.tableRender = true
        resolve(fn())
        this.$nextTick(() => {
          setTimeout(() => {
            this.renderMap.tableRender = false
          }, 100)
        })
      }), 100)
      return timer
    },
    addTabelHeightListener(isSelf = 'self') {
      const useEl = isSelf === 'self' ? this.$el : this.$parent.$el
      const useFunction = isSelf === 'self' ? this.setTableHeightBySelf : this.setTableHeightByParent
      let timer
      this.$erd.listenTo(useEl, element => {
        if (!this.renderMap.tableRender) {
          timer = this.watchResizeFinish(useFunction, timer)
        }
      })
    },
    isTableSelected(message = '请先选择需要修改的数据') {
      // 成立条件：istableRadioSlected ==  true || this.isTableCheckBoxSelected == true
      // 失败：提示message 并反馈false
      if (this.isTableRadioSelected || this.isTableCheckBoxSelected) {
        return true
      } else {
        this.$message({ type: 'warning', message })
        return false
      }
    },
    formatColumn(row, cell, value, index) {
      // 单元格为空值，默认显示'--'
      return (value === null || value === '' || value === void 0) ? '--' : value
    }
  },
  beforeDestroy() {
    this.$erd.removeAllListeners(this.$el)
  }
}
