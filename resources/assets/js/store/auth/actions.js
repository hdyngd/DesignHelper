import * as types from './mutation-types'
// import { SET_ERRORS }  from '../common/mutation-types'
import store from "../index";
export const actions = {
    login ({commit, dispatch}, data) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/login',
                params: data,
                method: 'post'
            }
            dispatch('api', payload)
                .then((res) => {
                    window.localStorage.setItem('token', res.access_token)
                    window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.access_token
                    commit(types.LOGGED_IN, {token: res.access_token})

                    dispatch('fetchMe');
                    resolve(res)
                }).catch((error) => {
                    // commit(SET_ERRORS, error)
                    reject(error)
                })
        })
    },
    logout ({commit, dispatch}) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/logout',
                method: 'get'
            }
            dispatch('api', payload)
                .then(() => {
                    window.localStorage.setItem('token', '')
                    // window.localStorage.setItem('refreshToken', '')
                    window.localStorage.setItem('user', {})
                    axios.defaults.headers.common['Authorization'] = 'Bearer '
                    commit(types.LOGGED_OUT)
                    router.push('/login')
                    resolve()
                }).catch((error) => {
                reject(error)
            })
        })
    },
    fetchMe ({commit, dispatch}) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/me',
                method: 'get'
            }
            dispatch('api', payload)
                .then((res) => {
                    window.localStorage.setItem('user', JSON.stringify(res))
                    commit(types.SET_USER, {user: res})
                    resolve(res)
                }).catch((error) => {
                // commit(SET_ERRORS, error)
                reject(error)
            })
        })
    },
    setEmailToken({commit}, emailToken) {
        commit(types.SET_EMAIL_TOKEN, {emailToken: emailToken});
    },
    setPassword({commit, dispatch}, data) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/set_password',
                params: data,
                method: 'post'
            }
            dispatch('api', payload)
                .then((res) => {
                    commit(types.SET_EMAIL_TOKEN, {emailToken: ''});
                    dispatch('flushSuccess', {title: 'Success', message: 'パスワードを設定しました。'})
                    resolve(res)
                }).catch((error) => {
                commit(types.SET_EMAIL_TOKEN, {emailToken: ''});
                dispatch('flushError', {title: 'Error', message: 'パスワード設定に失敗しました。'})
                reject(error)
            })
        })
    }
}