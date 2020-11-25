




<template>
	<section>
		<div>
			<h1>test</h1>

			<div class="list1">
                <h1>list 1</h1>
				<ul>
					<li v-for="songs in getSongs[0].songs" :key="songs.id">
						<iframe width="300" height="200" :src="'https://www.youtube.com/embed/'+songs.songUrlId" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</li>
				</ul>
			</div>

			<div class="list2">
                <h1>list 2</h1>
				<ul>
					<li v-for="songs in getSongs[1].songs" :key="songs.id">
						<iframe width="300" height="200" :src="'https://www.youtube.com/embed/'+songs.songUrlId" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</li>
				</ul>
			</div>

			<!-- <pre>

                {{getSongs.songs}}

			</pre>-->
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			txt: "ff",
		};
	},
	computed: {
		getSongs() {
			return this.$store.getters.getSongsForDisplay;
		},
	},
	methods: {},
};
</script>

<style>
</style>