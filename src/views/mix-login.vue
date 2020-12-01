
<template>
  <section class="login-user" v-if="!loggedinUser">
    <h1>Login</h1>
    <div class="checkLogin" >
      <form @keyup.enter="login">
        <el-input type="text" placeholder="User name" v-model="cerdentials.email" required clearable />
        <br/>
        <el-input type="text" placeholder="Password" v-model="cerdentials.password" show-password required clearable />
        <br/>
        <el-button @click.prevent="login"  type="success">Login</el-button>
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
        email: '',
        password: ''
      }
    }
  },
  computed: {
    loggedinUser() {
      var user = this.$store.getters.getLoggedinUser;
      console.log('user', user);
      return user
    },
  },
  created() {
  },
  methods: {
    login() {
      console.log('here');
      this.$store.dispatch({
        type: "login",
        userCred: this.cerdentials
      });
      // console.log('loggedinUser',this.loggedinUser);
    }
  },
  watch: {

  }
}
</script>
