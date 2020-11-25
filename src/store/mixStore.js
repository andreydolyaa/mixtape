import {mixService} from '@/services/mixService.js'

export default{
    state:{
        mixes:null,
        genre:null
    },
    getters:{
        getMixesForDisplay(state) {
            return state.mixes;
        },
        getGenreToDisplay(state) {
            console.log('get state.genre',state.genre)
            return state.genre;
            
        },
    },
    mutations:{
        setMixes(state, payload) {
            state.mixes = payload.mixes;
        },
        setGenre(state, payload){
            console.log('setGenre',payload)
            state.genre = payload.genre
            console.log('set state.genre',state.genre)
        },
    },
    actions:{
        getMixById(contex, {mixId}){
            return mixService.getById(mixId)
        },
        async loadMixes(context) {
            var mixes = await mixService.query();
            console.log('@@@@@@@@:',mixes);
            context.commit({ type: 'setMixes', mixes });
            return mixes;
        },
    }
}