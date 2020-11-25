import {userService} from '@/services/userService.js'

export default {
    state: {
        loggedinUser: null,
        users: []
    },
    getters: {
        user(state) {
            return state.loggedinUser
        },
        isAdmin() {

        },
        users(state) {
            return state.users;
        }
    },
    mutations: {
        setUser(state, { user }) {
            state.loggedinUser = user;
        },
        setUsers(state, {users}){
            state.users = users;
        }
    },
    actions: {
        async login(context, { userCred }) {
            const user = await userService.login(userCred);
            context.commit({ type: 'setUser', user })
            return user;
        },
        // async logout(context) {
        //     await userService.logout()
        //     context.commit({type: 'setUsers', users: []})
        //     context.commit({type: 'setUser', user: null})
        // },
        // signup(context, { userCred }) {
        //     const user = await userService.signup(userCred)
        //     context.commit({type: 'setUser', user})
        //     return user;
        // }
    }
}