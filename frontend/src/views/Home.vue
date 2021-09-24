<template>
  <div class="col">
    <div class="col">
      <Alert/>
    </div>
    <div class="col">
      <button @click="addNewCustomer">
        Add new customer
      </button>
    </div>
    <div class="col">
      <div class="col-3 input-group">
        <input
            v-model="firstName"
            type="text"
            placeholder="First Name"
        >
      </div>
      <div class="col-3 input-group">
        <input
            v-model="lastName"
            type="text"
            placeholder="Last Name"
        >
      </div>
      <div class="col-3 input-group">
        <input
            v-model="email"
            type="text"
            placeholder="Email"
        >
      </div>
      <div class="col-3 input-group">
        <button @click="search">
          Search
        </button>
      </div>
    </div>
    <div class="col" style="padding: 10px">
      <table>
        <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Telephone</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="customer in customers"
            :key="customer.id"
        >
          <td>{{ customer.first_name }}</td>
          <td>{{ customer.last_name }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.mobile }}</td>
          <td>{{ customer.telephone }}</td>
          <td>
            <button @click="edit(customer.id)">
              Edit
            </button>
          </td>
          <td>
            <button @click="remove(customer.id)">
              Delete
            </button>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="col">
        <ul class="pagination">
          <li v-if="pagination.current_page>1">
            <button @click="getCustomers(pagination.current_page-1)">Previous</button>
          </li>
          <li :key="i" v-for="i of pagination.last_page" :class="{'active':pagination.current_page===i}">
            <button @click="getCustomers(i)">{{ i }}</button>
          </li>
          <li v-if="pagination.current_page<pagination.last_page">
            <button @click="getCustomers(pagination.current_page+1)">Next</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import customers from "../services/customers";
import deleteCustomer from "../services/delete-customer";
import Alert from "../components/Alert";

export default {
  components: {Alert},
  data: function () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      customers: [],
      alert: {},
      pagination: {}
    };
  },
  async mounted() {
    await this.getCustomers()
  },
  methods: {
    addNewCustomer: function () {
      this.$router.push({name: 'Add New Customer'})
    },
    search: async function () {
      await this.getCustomers()
    },
    getCustomers: async function (page = '') {
      try {
        const customerData = await customers({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          page: page
        }, this.$store.state.token)
        this.customers = customerData.data
        this.pagination = customerData
      } catch (e) {
        console.error(e)
      }
    },
    edit: function (customerId) {
      this.$router.push('/customers/' + customerId)
    },
    async remove(id) {
      try {
        const confirm = window.confirm('Are you sure you want to delete this customer?')
        if (confirm) {
          const deletedData = await deleteCustomer(id, this.$store.state.token)
          if (deletedData) {
            await this.$store.dispatch('setAlert', {
              type: 'success',
              message: 'Customer deleted successfully',
              title: 'Success'
            })
            await this.getCustomers()
          }
        }
      } catch (e) {
        console.error(e)
      }
    },
  }
}
</script>
