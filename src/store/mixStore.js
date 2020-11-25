import {mixService} from '@/services/mixService.js'

export default{
    state:{
        mixes:[]
    },
    getters:{

    },
    mutations:{

    },
    actions:{
        getMixById(contex, {mixId}){
            return mixService.getById(mixId)
        }
    }
}