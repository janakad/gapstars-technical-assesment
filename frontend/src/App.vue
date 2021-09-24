<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <ul
          v-if="token"
          id="nav"

        >
          <li >
            <router-link
              to="/"

              href="#"
            >
              Home
            </router-link>
          </li>
          <li >
            <button

              @click="logout"
            >
              Logout
            </button>
          </li>
        </ul>
        <div class="col" style="margin-top: 40px">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    token() {
      return this.$store.state.token
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('setToken', '')
      return this.$router.push({name: 'Login'})
    }
  }
}
</script>
