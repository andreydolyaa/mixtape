
<template>
  <section class="mix-details">
    <h3>Mix</h3>
    <h1>{{mix}}</h1>
    <!-- <el-input type="text" placeholder="Search in mix" v-model=""></el-input> -->
    <!-- <h1>name of the Mix</h1> -->
    <!-- <img src=""> -->

  </section>
</template>

<script>
export default {
  data() {
    return{
      mix: null
    }
  },
  computed: {

  },
  components: {
  },
  async created() {
     const mixId = this.$route.params.id;
     console.log('mixId', mixId);
     this.mix = await this.$store.dispatch({ type: "getMixById", mixId });
  }
}

</script>
