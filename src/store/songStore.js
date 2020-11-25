


import { songService } from '../services/songService.js';


export default {
    state: {
        songs: null,
    },
    getters: {
        getSongsForDisplay(state) {
            return state.songs;
        }
    },
    mutations: {
        setSongs(state, payload) {
            state.songs = payload.songs;
        }
    },
    actions: {
        async loadSongs(context) {
            var songs = await songService.query();
            context.commit({ type: 'setSongs', songs });
            console.log(songs[0].songs);
            return songs;
        }
    }
}