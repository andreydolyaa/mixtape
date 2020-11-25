<template>
  <section class="mixListHome">
            <ul class="ulMixes"> 
              <!--  -->
                <li class="mix" v-for="mix in mixes" :key="mix._id" > 
                  <!-- <pre>{{mix}}</pre> -->
                   <mixPreview :mix="mix"/>
                </li>
            </ul> 
           
  </section>
</template>

<script>
import mixPreview from '../components/mix-preview.cmp.vue';

export default {
  name:'mix-list-home',
  data(){
    return{
    mixes: [
                {
                    "_id": "5c09",
                    "name": "Funky Monks",
                    "tags": [
                        "Funk",
                        "Happy"
                    ],
                    "createdBy": {
                        "_id": "u101",
                        "fullName": "Puki Ben David",
                        "imgUrl": "http://some-photo/"
                    },
                    "likedByUsers": [
                        {
                            "_id": "u102",
                            "fullName": "Orly Amdadi",
                            "imgUrl": "http://some-img"
                        },
                        {
                            "_id": "u103",
                            "fullName": "Harel Hashovav",
                            "imgUrl": "http://some-img"
                        }
                    ],
                    "songs": [
                        {
                            "title": "The Meters - Cissy Strut",
                            "id": "s1001",
                            "songUrlId":"4_iC0MyIykM",
                            "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
                            "addedBy": "minimal-user"
                        },
                        {
                            "title": "The JB's - Pass The Peas",
                            "id": "mUkfiLjooxs",
                            "songUrlId":"4_iC0MyIykM",
                            "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                            "addedBy": {}
                        }
                    ]
                },
                {
                    "_id": "8f25",
                    "name": "Funky Rocks",
                    "tags": [
                        "Funk",
                        "Happy"
                    ],
                    "createdBy": {
                        "_id": "u101",
                        "fullName": "Puki Ben David",
                        "imgUrl": "http://some-photo/"
                    },
                    "likedByUsers": [
                        {
                            "_id": "u102",
                            "fullName": "Orly Amdadi",
                            "imgUrl": "http://some-img"
                        },
                        {
                            "_id": "u103",
                            "fullName": "Harel Hashovav",
                            "imgUrl": "http://some-img"
                        }
                    ],
                    "songs": [
                        {
                            "title": "The Meters - Cissy Strut",
                            "id": "s1001",
                            "songUrlId":"4_iC0MyIykM",
                            "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
                            "addedBy": "minimal-user"
                        },
                        {
                            "title": "The JB's - Pass The Peas",
                            "id": "mUkfiLjooxs",
                            "songUrlId":"4_iC0MyIykM",
                            "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                            "addedBy": {}
                        }
                    ]
                }
            ], //end of mixes
          }
  }, //end of data
  computed : {
 
  },
  components: {
    mixPreview
  },
  created(){
    console.log('mix data',this.mixes)

  }
} // end of export default
</script>

<style>

</style>