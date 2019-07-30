import * as types from './mutation-types'
import store from "../index";
export const actions = {
    createUser ({commit, dispatch}, data) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/user/store',
                params: data,
                method: 'post'
            }
            dispatch('api', payload)
                .then((res) => {
                    resolve(res)
                }).catch((error) => {
                // commit(SET_ERRORS, error)
                reject(error)
            })
        })
    },
}