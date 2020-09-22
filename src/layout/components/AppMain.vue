<template>
  <section class="app-main">
    <vue-scroll>
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </vue-scroll>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  box-sizing: border-box;
  background-color: #fff;
  margin: 15px;
  height: calc(100vh - 80px);
  position: relative;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
