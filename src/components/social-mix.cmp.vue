<template>
  <div class="search-song-and-social">
    <section class="mix-social flex space-between">
      <!-- <button>shaffle</button> -->
      <div class="share-container flex">
        <div class="invite">
          <!-- <p>invite a friend to join you:</p> -->
        </div>
        <div class="mix-social-nav flex space-evenly">
          <input v-model="phoneNumber" placeholder="Messege to..." name="phone-number" type="number"/>
          <!-- {{phoneNumber}} {{link}} dev -->
          <a @click="sendwMsg"> <i class="fab fa-whatsapp"></i></a>
          <a  @click="shareOnFB" > <i class="fab fa-facebook-square"></i> </a>
          
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const axios = require("axios");

export default {


  name: 'mix-social',
  props: {
    mix: Object
  },
  data() {
    return {
      phoneNumber:null,
      link: window.location.href,
    }
  },
  methods: {
    shareOnFB(){
      var link = this.link
        console.log('link',link)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${{link}}`);
    },
    sendwMsg(){
      console.log(this.phoneNumber)
      console.log(window.location.href)

      if(!this.phoneNumber) return
      //window.open(`https://wa.me/${{phoneNumber}}?text=hi%20there`,"_blank" );
      var number = this.phoneNumber
      var link = window.location.href
      axios
        .post(`https://wa.me/${{number}}?text=hi%20there%20${{link}}`,)
    }
  },
  computed: {

  },
  components: {
  },
  created() {
  }
} 
</script>
