<template>
  <div class="stats-wrap flex">
    <div
      v-for="(item,index) of useData"
      :key="`stats-item-${index}`"
      v-loading="item.loading"
      class="statsItem flexable"
    >
      <div class="statsItem-title" v-text="item.title" />
      <div class="statsItem-content">
        <div class="bold stats-count" v-text="item.count" />
        <!-- <div class="statsItem-day item-row flex">
          <span class="item-label" v-text="'日'" />
          <span v-if="item.day">
            <svg-icon v-if="item.dayType === 'rise'" icon-class="rise" class="color-green" />
            <svg-icon v-else icon-class="descend" class="color-red" />
            {{ item.day }}%
          </span>
          <span v-else v-text="'--'" />
        </div>
        <div class="statsItem-week item-row flex">
          <span class="item-label" v-text="'周'" />
          <span v-if="item.week">
            <svg-icon v-if="item.weekType === 'rise'" icon-class="rise" class="color-green" />
            <svg-icon v-else icon-class="descend" class="color-red" />
            {{ item.week }}%
          </span>
          <span v-else v-text="'--'" />
        </div>
        <div class="statsItem-month item-row flex">
          <span class="item-label" v-text="'月'" />
          <span v-text="item.month || '--'" />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getStatistics, sumStatistics } from '@/api/dataCenter'
export default {
  data() {
    return {
      useData: {
        ystdRegis: {
          title: '昨日新增注册人数',
          count: 0,
          day: '',
          week: '',
          month: '',
          loading: true
        },
        totalRegis: {
          title: '累计注册人数',
          count: 0,
          day: '',
          week: '',
          month: '',
          loading: true
        },
        ystdActive: {
          title: '昨日发布活动数',
          count: 0,
          day: '',
          week: '',
          month: '',
          loading: true
        },
        totalActive: {
          title: '累计发布活动数',
          count: 0,
          day: '',
          week: '',
          month: '',
          loading: true
        }
      }
    }
  },
  created() {
    this.getBaseData()
  },
  methods: {
    async getBaseData() {
      try {
        const startDate = this.$day(new Date()).subtract(1, 'day').format('YYYY-MM-DD')
        const endDate = startDate
        const task = []
        task.push(this.getYstdRegis({ startDate, endDate }))
        task.push(this.getYstdActivity({ startDate, endDate }))
        task.push(this.getTotalRegis({ startDate, endDate }))
        task.push(this.getTotalActivity({ startDate, endDate }))
        await Promise.all(task)
      } catch (err) {
        console.log(err)
      }
    },
    async getYstdRegis(date) {
      try {
        const type = 'register'
        const result = await this.getStatisicData({ type, ...date })
        this.useData.ystdRegis.count = Array.isArray(result) ? result[0].count : null
      } catch (err) {
        console.log(err)
      } finally {
        this.useData.ystdRegis.loading = false
      }
    },
    async getYstdActivity(date) {
      try {
        const type = 'activity'
        const result = await this.getStatisicData({ type, ...date })
        this.useData.ystdActive.count = Array.isArray(result) ? result[0].count : null
      } catch (err) {
        console.log(err)
      } finally {
        this.useData.ystdActive.loading = false
      }
    },
    async getTotalRegis() {
      try {
        const type = 'register'
        this.useData.totalRegis.count = await this.sumStatisicData({ type })
      } catch (err) {
        console.log(err)
      } finally {
        this.useData.totalRegis.loading = false
      }
    },
    async getTotalActivity() {
      try {
        const type = 'activity'
        this.useData.totalActive.count = await this.sumStatisicData({ type })
      } catch (err) {
        console.log(err)
      } finally {
        this.useData.totalActive.loading = false
      }
    },
    async getStatisicData(params) {
      try {
        const result = await getStatistics(params)
        return result.hasOwnProperty('data') ? result.data : null
      } catch (err) {
        console.log(err)
      }
    },
    async sumStatisicData(params) {
      try {
        const result = await sumStatistics(params)
        return result.hasOwnProperty('data') ? result.data : null
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss">
.stats-wrap{
  margin-top: 20px;
  justify-content: space-between;
  .statsItem{
    border: 1px solid #000;
    &:not(:last-of-type){
      margin-right: 15px;
    }
    .statsItem-title{
      background: #ddd;
      padding: 10px 20px;
      line-height: 20px;
    }
    .statsItem-content{
      text-align: center;
      padding: 10px;
      >*:not(:last-of-type){
        margin-bottom: 10px;
      }
      .item-row{
        justify-content: center;
        :not(.item-label){
          flex: 1 1 auto;
          text-align: left;
        }
      }
      .item-label{
        flex: 0 0 40%;
        text-align: right;
        margin-right: 5px;
      }
      .stats-count{
        font-size: 20px;
      }
    }
  }
}
</style>
