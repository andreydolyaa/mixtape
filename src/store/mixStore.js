import { mixService } from '@/services/mixService.js'
 
export default {
    state: {
        mixes: null,
        genre: null,
        currMix: null,
        currSongPlaying: null,
        isPlaying: false
    },
    getters: {
        getMixesForDisplay(state) {
            return state.mixes;
        },
        getGenreToDisplay(state) {
            console.log('get state.genre', state.genre)
            return state.genre;
        },
        getCurrSongPlaying(state) {
            return state.currSongPlaying;
        },
        getMix(state) {
            return state.currMix;
        },
        getThisIsPlaying(state) {
            return state.isPlaying;
        }
    },
    mutations: {
        setMixes(state, payload) {
            state.mixes = payload.mixes;
        },
        setGenre(state, payload) {
            console.log('setGenre', payload)
            state.genre = payload.genre
            console.log('set state.genre', state.genre)
        },
        setCurrSong(state, payload) {
            state.currSongPlaying = payload.song;
        },
        removeCurrSong(state, payload) {
            const idx = state.mixes[state.currMix._id].songs.findIndex(song => song.id === payload.song.id);
            state.mixes[state.currMix._id].songs.splice(idx, 1);
            console.log(state.mixes[state.currMix._id].songs);
        },
        setMix(state, payload) {
            state.currMix = payload.mix;
        },
        nowPlaying(state, payload) {
            state.isPlaying = payload.isPlaying;
        }
    },
    actions: {
        async getMixById(contex, { mixId }) {
            console.log('mixId', mixId)
            const mix = await mixService.getById(mixId);
            // console.log('mix',mix);
            contex.commit({ type: 'setMix', mix });
        },
        async loadMixes(context) {
            var mixes = await mixService.query();
            context.commit({ type: 'setMixes', mixes });
            return mixes;
        },
        async getSongById(context, payload) {
            var song = await mixService.getSongByIdAndMix(payload.songId, payload.mixId);
            context.commit({ type: 'setCurrSong', song })
            return song;
        },
        async saveMix(context, payload) {
            console.log(payload.mix)
            const mix = await mixService.update(payload.mix);
            context.commit({ type: 'setMix', mix })
            console.log('mix in store', mix)
            return mix
        },
    },
}