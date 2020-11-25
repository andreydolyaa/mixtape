


import { songService } from '../services/songService.js';


export default {
    state: {
        songs: null,
        song:null
    },
    getters: {
        getSongsForDisplay(state) {
            return state.songs;
        },
        getSongForDisplay(state){
            return state.song;
        }
    },
    mutations: {
        setSongs(state, payload) {
            state.songs = payload.songs;
        },
        setSong(state,payload){
            var song = state.songs.find(song => song.id === payload.songId);
            state.song = song;
        }
    },
    actions: {
        async loadSongs(context) {
            var songs = await songService.query();
            context.commit({ type: 'setSongs', songs });
            return songs;
        },
        getSong(context,payload){
            context.commit({type:'setSong',songId:payload.songId})
            console.log(payload.songId);
        }
    }
}