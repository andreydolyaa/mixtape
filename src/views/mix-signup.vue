
<template>
  <section class="signup-user">
      <h1>Signup</h1>
    <form @submit.prevent="signup">
      <input type="text" v-model="cerdentials.email" placeholder="Email">
      <br />
      <input type="text" v-model="cerdentials.username" placeholder="Username">
      <br />
      <input type="text" v-model="cerdentials.password" placeholder="Password">
      <br />
      <button>Signup</button>
    </form>
  </section>
</template>

<script>
export default {
name: 'login',
  data() {
    return {
      cerdentials: {
        email: '',
        username: '',
        password: ''
      }
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    signup() {
      this.$store.dispatch({
        type: "signup",
        userCred: this.cerdentials
      });
      this.$router.push("/");
    }
  },
  watch: {

  }
}
</script>
