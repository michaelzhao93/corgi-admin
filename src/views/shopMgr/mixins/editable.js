import delDialog from '@/components/delDialog/index'
import { emit } from '@/mixins/commonSet'
export default {
  components: { delDialog },
  mixins: [emit],
  data() {
    return {
      visibleMap: {
        editDiaVisible: false,
        delDiaVisible: false
      },
      loadingMap: {
        editLoading: true,
        editBtnLoading: false,
        delBtnLoading: false
      },
      formRef: 'editableForm'
    }
  },
  methods: {
    showTableAdd() {
      this.loadingMap.editLoading = true
      this.visibleMap.editDiaVisible = true
      this.$nextTick(() => {
        this.dialogSet = this.$common.deepCopy(this.addDialogSet)
        this.$refs[this.formRef] && this.$refs[this.formRef].resetFields()
        this.loadingMap.editLoading = false
      })
    },
    showTableEdit() {
      if (this.isTableSelected()) {
        this.loadingMap.editLoading = true
        this.visibleMap.editDiaVisible = true
        this.editDialogSet.form = this.catchedData
        this.dialogSet = this.editDialogSet
        this.loadingMap.editLoading = false
      }
    },
    showTableDel() {
      this.visibleMap.delDiaVisible = this.isTableSelected()
    },
    editDiaClose() {
      this.visibleMap.editDiaVisible = false
    },
    handleEditDiaClick(functionName) {
      this[functionName]()
    },
    delDiaClose() {
      this.visibleMap.delDiaVisible = false
    }
  },
  computed: {
    checkeditableFormValid() {
      return this.$common.checkFormValid(this, this.formRef)
    }
  }
}
