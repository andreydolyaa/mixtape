
<template>
  <section>
    <div class="app-header">
      <!-- <h1>app header</h1> -->
        <div class="logo">
            <img class="reflect" src="https://res.cloudinary.com/hw-projects/image/upload/v1606400976/appmixes/logo_r_animated_v2_rpqeo0.gif" >
          </div>
        <nav>   
          <div class="nav-mix">
            <router-link to="/genres">Genres</router-link>
            <router-link to="/mixes">Mixes</router-link>
            <!-- <router-link to="/newMix">Create Mix</router-link> -->
          </div>
          <div class="nav-user">
            <router-link to="/login">Login</router-link>
            <router-link to="/signup">Signup</router-link>
          </div>
        </nav>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style>

</style>