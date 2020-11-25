
<template>
  <section>
    <div class="app-header">
      <h1>app header</h1>
        <nav>
          <div class="logo">

          </div>
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