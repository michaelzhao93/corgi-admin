<template>
  <div :class="[id && 'pointer']" @click="handleActivityIdClick(id)" v-text="id || '--'" />
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  methods: {
    ...mapMutations('activityInfo', {
      'setShow': 'SET_SHOW',
      'setActivityId': 'SET_ACTIVITY_ID'
    }),
    handleActivityIdClick(id) {
      if (id) {
        this.setActivityId(id)
        this.setShow(true)
      }
    }
  }
}
</script>

<style>

</style>
