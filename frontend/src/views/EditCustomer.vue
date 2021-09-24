<template>
  <div class="col">
    <div class="col">
      <button @click="allCustomers()">
        All Customers
      </button>
    </div>
    <div class="col">
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
    </div>
    <button @click="submit">
      Submit
    </button>
  </div>
</template>

<script>

import customer from "../services/customer";
import editCustomer from "../services/edit-customer";

export default {
  data: function () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      telephone: '',
      validation: [],
      alert: {
        type: '',
        title: '',
        message: ''
      }
    };
  },
  async mounted() {
    try {
      const customerData = await customer(this.$route.params.id, this.$store.state.token)
      if (customerData) {
        this.firstName = customerData.first_name;
        this.lastName = customerData.last_name;
        this.email = customerData.email;
        this.mobile = customerData.mobile;
        this.telephone = customerData.telephone;
      }
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    allCustomers: function () {
      this.$router.push({name: 'Home'})
    },
    submit: async function () {
      try {
        const customerData = await editCustomer({
          id: this.$route.params.id,
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          telephone: this.telephone
        }, this.$store.state.token)
        if (customerData) {
          this.$store.dispatch('setAlert', {
            type: 'success',
            message: 'Customer updated successfully',
            title: 'Success'
          })
          await this.$router.push({name: 'Home'})
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
