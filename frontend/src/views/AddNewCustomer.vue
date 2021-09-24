<template>
  <div class="row">
    <div class="col">
      <button @click="allCustomers()">
        All Customers
      </button>
    </div>
    <div class="col-3 input-group">
      <input
          v-model="firstName"
          type="text"
          placeholder="First Name"
      >
      <small
          v-if="validation.first_name"

      >{{ validation.first_name[0] }}</small>
    </div>
    <div class="col-3 input-group">
      <input
          v-model="lastName"
          type="text"
          placeholder="Last Name"
      >
      <small
          v-if="validation.last_name"

      >{{ validation.last_name[0] }}</small>
    </div>
    <div class="col-3 input-group">
      <input
          v-model="email"
          type="email"
          placeholder="Email"
      >
      <small
          v-if="validation.email"

      >{{ validation.email[0] }}</small>
    </div>

    <div class="col-3 input-group">
      <input
          v-model="mobile"
          type="text"
          placeholder="Mobile"
      >
      <small
          v-if="validation.mobile"

      >{{ validation.mobile[0] }}</small>
    </div>

    <div class="col-3 input-group">
      <input
          v-model="telephone"
          type="text"
          placeholder="Telephone"
      >
      <small
          v-if="validation.telephone"

      >{{ validation.telephone[0] }}</small>
    </div>
    <div class="col" style="margin-top: 30px">
      <button @click="submit">
        Submit
      </button>
    </div>
  </div>
</template>

<script>

import addNewCustomer from "../services/add-new-customer";

export default {
  data: function () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      telephone: '',
      validation: [],
      alert: {}
    };
  },

  methods: {
    allCustomers: function () {
      this.$router.push({name: 'Home'})
    },
    submit: async function () {
      try {
        const addCustomerData = await addNewCustomer({
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          mobile: this.mobile,
          telephone: this.telephone,
        }, this.$store.state.token)
        if (addCustomerData) {
          this.$store.dispatch('setAlert', {
            type: 'success',
            message: 'Customer added successfully',
            title: 'Success'
          })
          this.$router.push({name: 'Home'})
        }
      } catch (e) {
        console.error(e)
        if (e.response.data.errors) {
          this.validation = e.response.data.errors
        }
      }
    }
  }
}
</script>
