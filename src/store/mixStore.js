import { mixService } from '@/services/mixService.js'

export default {
    state: {
        mixes: null,
        topMixes:null,
        genre: null,
        currMix: null,
        currSongPlaying: null,
        isPlaying: false,
        geners: ['funk', 'pop', 'rock', 'electro', 'classic', 'israeli', 'techno', 'trance']
    },
    getters: {
        getMixesForDisplay(state) {
            return state.mixes;
        },
        getGenreToDisplay(state) {
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
        },
        getCurrSongIsPlaying(state) {
            if (state.currSongPlaying) {
                return state.currSongPlaying.isPlaying;
            }
        },
        getTopMixes(state){
            return state.topMixes
        },
        getGeners(state) {
            return state.geners
        }
    },
    mutations: {
        setSortedMixes(state, payload){
            //console.log(' setSortedMixes',payload.mixes)
            var sortby = 'likes'
            var res = payload.mixes.sort(function (a, b) {
                var numA = a[sortby];
                var numB = b[sortby];
                return  numB - numA;
            });
            var resSliced = res.slice(0, 3);
            //console.log('resSliced',resSliced)
            state.topMixes = resSliced;
        },
        setMixes(state, payload) {
            state.mixes = payload.mixes;
        },
        setGenre(state, payload) {
            state.genre = payload.genre
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
        setMixEmpty(state, payload) {
            state.currMix = null;
        },
        nowPlaying(state, payload) {
            state.isPlaying = payload.isPlaying;
        },
        stopSongPlaying(state, payload) {
            state.currSongPlaying.isPlaying = false
        },
        startSongPlaying(state, payload) {
            state.currSongPlaying.isPlaying = true
        },
        stopAllPlaying(state, payload) {
            payload.songs.forEach(currSong => {
                if (currSong.id !== payload.song.id) {
                    currSong.isPlaying = false;
                }
            })
        },
        setPrevSongNotPlaying(state, payload) {
            state.currMix.songs[payload.songIdx].isPlaying = false;
        },
        resetIconsState(state){
                state.currMix.songs.forEach(song => song.isPlaying = false)
        },
    },
    actions: {
        async getTopMixes(context) {
            var mixes = await mixService.query();
            context.commit({ type: 'setSortedMixes', mixes });
        },
        async getMixById(context, { mixId }) {
            const mix = await mixService.getById(mixId);
            context.commit({ type: 'setMix', mix });
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
            const mix = await mixService.update(payload.mix);
            context.commit({ type: 'setMix', mix })
            return mix
        },
        sortByNumber(array, sortby) {
            console.log('sort')
            array.sort(function (a, b) {
                var numA = a[sortby];
                var numB = b[sortby];
                return numA - numB;
            });
        }
    },
}