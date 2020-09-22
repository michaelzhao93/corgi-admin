<template>
  <div class="btn-group flex">
    <div
      v-for="btn of btnGroup"
      :key="`btnItem_${btn.text}`"
      :class="['btn-item','pointer', btn.active && 'active']"
      @click="handleBtnClick(btn)"
    >
      <svg-icon :icon-class="btn.icon" />
      <span v-text="btn.text" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnGroup: [
        {
          icon: 'all',
          text: 'ALL',
          active: true
        },
        {
          icon: 'ios',
          text: 'IOS',
          active: false
        },
        {
          icon: 'android',
          text: 'Android',
          active: false
        }
      ]
    }
  },
  methods: {
    handleBtnClick(btn) {
      this.btnGroup.some(item => {
        if (item.active) {
          item.active = false
          return true
        }
        return false
      })
      btn.active = true
      this.$emit('emitFunc', { function: 'getData', arguments: [] })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-group{
  .btn-item{
    margin-right: 25px;
    text-align: center;
    line-height: 30px;
    border-radius: 20px;
    padding: 0 15px;
    border: 1px solid #eee;
    transition: all 0.4s;
    &.active{
      border-color: #116dde;
      background-color: #116dde;
      color: #fff;
    }
  }
}
</style>
