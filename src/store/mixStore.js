import { mixService } from '@/services/mixService.js'

export default {
    state: {
        mixes: null,
        genre: null,
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
        }
    },
    actions: {
        getMixById(contex, { mixId }) {
            return mixService.getById(mixId)
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
    }
}