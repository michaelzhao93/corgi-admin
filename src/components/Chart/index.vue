<template>
  <div class="chart-module" :style="{height}" />
</template>

<script>
export default {
  props: {
    initOption: {
      type: Object,
      default: () => ({})
    },
    chartOption: {
      type: Object,
      default: () => ({})
    },
    height: {
      type: String,
      default: '50vh'
    }
  },
  data() {
    return {
      chart: {}
    }
  },
  watch: {
    chartOption: {
      deep: true,
      handler(val) {
        this.setOption()
      }
    }
  },
  mounted() {
    this.init()
    this.$erd.listenTo(this.$el, this.chart.resize)
  },
  beforeDestroy() {
    this.$erd.removeListener(this.$el, this.chart.resize)
  },
  methods: {
    init() {
      const { theme, opts } = this.initOption
      this.chart = this.$chart.init(this.$el, theme, opts)
      this.setOption()
    },
    setOption() {
      const { option, opts } = this.chartOption
      this.chart.clear()
      this.chart.setOption(option, opts)
    }
  }
}
</script>

<style lang="scss">
</style>
