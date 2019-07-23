import * as types from './mutation-types'
// import { SET_ERRORS }  from '../common/mutation-types'
import store from "../index";
export const actions = {
    // login ({commit, dispatch}, data) {
    //     return new Promise((resolve, reject) => {
    //         const payload = {
    //             url : '/api/login',
    //             param: data,
    //             method: 'post'
    //         }
    //         dispatch('api', payload)
    //             .then((data) => {
    //                 if(data.refreshToken) {
    //                     window.localStorage.setItem('refreshToken', data.refreshToken)
    //                 }
    //                 window.localStorage.setItem('token', data.token)
    //                 window.localStorage.setItem('user', JSON.stringify(data.user))
    //                 axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token
    //                 commit(types.LOGGED_IN, data)
    //
    //                 resolve(data)
    //             }).catch((error) => {
    //                 commit(SET_ERRORS, error)
    //                 reject(error)
    //             })
    //     })
    // },
}