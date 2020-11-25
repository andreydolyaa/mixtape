import {mixService} from '@/services/mixService.js'

export default{
    state:{
        mixes:null,
    },
    getters:{
        getMixesForDisplay(state) {
            return state.mixes;
        },
    },
    mutations:{
        setMixes(state, payload) {
            state.mixes = payload.mixes;
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