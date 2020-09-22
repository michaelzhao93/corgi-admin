<template>
  <div :class="[id && 'pointer']" @click="handleUserIdClick(id)" v-text="id || '--'" />
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
    ...mapMutations('userInfo', {
      'setShow': 'SET_SHOW',
      'setUserId': 'SET_USER_ID'
    }),
    handleUserIdClick(id) {
      if (id) {
        this.setUserId(id)
        this.setShow(true)
      }
    }
  }
}
</script>

<style>

</style>
