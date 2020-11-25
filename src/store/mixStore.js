import { mixService } from '@/services/mixService.js'

export default {
    state: {
        mixes: [],
        currMix: null
    },
    getters: {
        getMix(state){
            return state.currMix;
        }
    },
    mutations: {
        setMix(state,payload){
            state.currMix = payload.mix;
        }
    },
    actions: {
        async getMixById(contex, { mixId }) {
            console.log('mixId',mixId)
            const mix = await mixService.getById(mixId);
            // console.log('mix',mix);
            contex.commit({type: 'setMix' , mix});
        }   
    }
}