<template>
  <div class="row">
    <div class="col">
      <div class="col-3"></div>
      <div class="col-6">
        <div class="input-group">
          <label
              for="email"
              :class="{'text-red-600':validation.email}"
          >
            Email
          </label>
          <input
              id="email"
              v-model="email"

              :class="{ 'border-red-600 text-red-600 placeholder-red-600':validation.email}"
              type="text"
              placeholder="Email"
          >
          <small
              v-if="validation.email"

          >{{ validation.email[0] }}</small>
        </div>
        <div class="input-group">
          <label

              for="password"
              :class="{'text-red-600':validation.password}"
          >
            Password
          </label>
          <input
              id="password"
              v-model="password"

              type="password"
              placeholder="******************"
              :class="{ 'border-red-600 text-red-600 placeholder-red-600':validation.password}"
          >
          <small
              v-if="validation.password"

          >{{ validation.password[0] }}</small>
        </div>
        <div class="col">
          <button

              type="button"
              @click="login"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import login from '../services/auth'

export default {
  data() {
    return {
      email: '',
      password: '',
      validation: []
    }
  },
  methods: {
    login: async function () {
      try {
        const loginResponse = await login(this.email, this.password)
        this.$store.dispatch('setToken', loginResponse)
        this.$store.dispatch('setAlert', {
          type: 'success',
          title: 'Success',
          message: 'Logged in successfully'
        })
        await this.$router.push({name: 'Home'})
      } catch (e) {
        console.error(e)
        if (e.response.data.errors) {
          this.validation = e.response.data.errors
          this.$store.dispatch('setAlert', {
            type: 'error',
            title: 'Validation',
            message: 'Please fill the fields correctly'
          })
        }
      }
    }
  }
}
</script>
