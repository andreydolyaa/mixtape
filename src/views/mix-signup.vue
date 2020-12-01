
<template>
  <section class="signup-user" v-if="!loggedinUser">
      <h1>Signup</h1>
    <form @keyup.enter="signup">
      <span>*</span>
      <el-input type="email" v-model="cerdentials.email" placeholder="Email" required clearable />
      <br />
      <span>*</span>
      <el-input type="text" v-model="cerdentials.username" placeholder="Username" required clearable />
      <br />
      <span>*</span>
      <el-input type="text" v-model="cerdentials.password" placeholder="Password" show-password required clearable />
      <br />
      <el-button @click.prevent="signup" type="success">Signup</el-button>
    </form>
    <br/>
    <p><span>*</span> - this is a required field</p>
  </section>
</template>

<script>
export default {
name: 'signup',
  data() {
    return {
      cerdentials: {
        email: '',
        username: '',
        password: '',
      }
    }
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.getLoggedinUser;
    },
  },
  created() {
  },
  methods: {
    signup() {
      this.$store.dispatch({
        type: "signup",
        userCred: this.cerdentials
      });
    }
  },
  components:{
    
  },
  watch: {

  }
}
</script>
<style scoped>
span{
  color: red;
}
</style>