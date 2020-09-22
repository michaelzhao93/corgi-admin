<template>
  <el-badge
    slot="title"
    class="slide-badge"
    :is-dot="isDot"
    type="warning"
    :hidden="shoulHideBadge"
    :value="badgeValue"
  >
    <svg-icon v-if="icon" :icon-class="icon" />
    <span v-if="title" v-text="title" />
  </el-badge>
</template>
<script>
export default {
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    badge: {
      type: String,
      default: ''
    },
    isDot: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    shoulHideBadge() {
      if (this.isDot) {
        return !this.shoulShowDot
      } else {
        return !this.badgeValue
      }
    },
    shoulShowDot() {
      const { dotStatus } = this.$store.state.slideBadge
      return dotStatus[this.badge]
    },
    badgeValue() {
      let value = 0
      const { valuesMap } = this.$store.state.slideBadge
      if (this.badge && valuesMap[this.badge]) {
        value = valuesMap[this.badge]
      }
      return value
    }
  },
  created() {
    if (this.badge) {
      this.$store.commit('slideBadge/ADD_ACTIVE_BADGE', this.badge)
    }
  }
}
</script>
