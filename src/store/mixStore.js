import { mixService } from '@/services/mixService.js'

export default {
    state: {
        mixes: null,
        currSongPlaying: null
    },
    getters: {
        getMixesForDisplay(state) {
            return state.mixes;
        },
        getCurrSong(state) {
            return state.currSongPlaying;
        }
    },
    mutations: {
        setMixes(state, payload) {
            state.mixes = payload.mixes;
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
        // getSongById(context, payload) {
        //     mixService.getSongByIdAndMix(payload.songId, payload, mixId)
        //         .then(song => {
        //             console.log(song);
        //             context.commit({ type: 'setCurrSong', song })
        //             return song;
        //         })

        // }
    }
}