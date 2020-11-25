import { mixService } from '@/services/mixService.js'

export default {
    state: {
        mixes: null,
        genre: null,
        currMix: null,
        currSongPlaying: null,
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
        getMix(state){
            return state.currMix;
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
        setMix(state, payload){
            state.currMix = payload.mix;
        }
    },
    actions: {
        async getMixById(contex, { mixId }) {
            console.log('mixId',mixId)
            const mix = await mixService.getById(mixId);
            // console.log('mix',mix);
            contex.commit({type: 'setMix' , mix});
        },   
        async loadMixes(context) {
            var mixes = await mixService.query();
            context.commit({ type: 'setMixes', mixes });
            return mixes;
        },
        async getSongById(context, payload) {
            var song = await mixService.getSongByIdAndMix(payload.songId, payload.mixId);
            context.commit({ type: 'setCurrSong', song })
            console.log('@@: ', song);
            return song;
        }
    },
}