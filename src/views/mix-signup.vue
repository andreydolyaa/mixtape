
<template>
  <section class="signup-user">
      <h1>Signup</h1>
    <form @submit.prevent="signup">
      <span>*</span>
      <el-input type="email" v-model="cerdentials.email" placeholder="Email" required clearable />
      <br />
      <span>*</span>
      <el-input type="text" v-model="cerdentials.username" placeholder="Username" required clearable />
      <br />
      <span>*</span>
      <el-input type="text" v-model="cerdentials.password" placeholder="Password" show-password required clearable />
      <br />
      <!-- TODO -->
      <!-- <el-date-picker type="date" placeholder="Your birthday" v-model="cerdentials.birth"></el-date-picker>
      <br /> -->
      <!-- gender place -->
      <el-button type="success">Signup</el-button>
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
        birth: '',
        gender: ''
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