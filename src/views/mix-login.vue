
<template>
  <section class="login-user">
    <h1>Login</h1>
    <div class="checkLogin" v-if="!loggedinUser">
      <form @submit.prevent="login">
        <input type="text" placeholder="User name" v-model="cerdentials.username" />
        <br/>
        <input type="text" placeholder="Password" v-model="cerdentials.password" />
        <br/>
        <button>Login</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      cerdentials: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  created() {
  },
  methods: {
    login() {
      this.$store.dispatch({
        type: "login",
        userCred: this.cerdentials
      });
      this.$router.push("/");
    }
  },
  watch: {

  }
}
</script>
