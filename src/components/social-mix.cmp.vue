<template>
     <div class="seach-song-and-social">
        <section class="search-song">
          <el-input
            type="text"
            placeholder="Search song..."
            clearable
          ></el-input>
        </section>
        <section class="mix-social flex space-between">
          <!-- <button>shaffle</button> -->
          <div class="share-container flex">
            <div class="invite">
              <p>invite a friend to join you:</p>
            </div>
            <div class="mix-social-nav flex space-evenly">
              <i class="fab fa-facebook-square"></i>
              <i class="fab fa-whatsapp"></i>
            </div>
          </div>
        </section>
      </div>
</template>

<script>

export default {
  name:'mix-social',
  data(){
    return{
    }
  }, 
  computed : {
 
  },
  components: {
  },
  created(){
  }
} 
</script>

<style>

</style>