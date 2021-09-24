<template>
  <div v-if="getAlertType" class="row message">
    <div class="col outer" :class="getAlertType" style="margin-bottom: 30px">
      <div class="col inner">
        <h3 class="col">{{ getAlertTitle }}</h3>
        <div class="col">{{ getAlertMessage }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Alert",
  mounted() {
    setTimeout(() => {
      this.$store.dispatch('setAlert', {type: null, title: null, message: null})
    }, 10000)
  },
  computed: {
    getAlertTitle() {
      return this.$store.state.alert.title
    },
    getAlertType() {
      return this.$store.state.alert.type
    },
    getAlertMessage() {
      return this.$store.state.alert.message
    },

  }

}
</script>
