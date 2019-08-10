import * as types from './mutation-types'
import { LOGGED_OUT } from '../auth/mutation-types'
import { Notification } from 'element-ui';

export const actions = {
    api({commit, dispatch}, {url, method, params}) {
        return new Promise((resolve, reject) => {
            commit(types.SET_IS_LOADING, true)
            window.axios[method](url, params)
                .then(({data}) => {
                    resolve(data)
                }).catch(({response}) => {
                if(response.status === 401) {
                    // const refreshToken = window.localStorage.getItem('refreshToken');
                    // if(refreshToken) {
                    //     dispatch('requestNewToken', refreshToken);
                    //     return;
                    // }
                    commit(types.SET_IS_LOADING, false)
                    commit(LOGGED_OUT)
                    window.localStorage.setItem('token', '')
                    window.localStorage.setItem('user', {})
                    const payload = {title: 'Error', message: '認証の有効期限が切れています。再度ログインをしてください。'}
                    dispatch('flushError', payload)
                    router.push('/login');
                    // return;
                }
                var errors = response.data.errors
                reject(errors)
            }).then(() => {
                commit(types.SET_IS_LOADING, false)
            })
        })
    },
    flushSuccess({commit, dispatch}, {title, message}) {
        Notification.success({
            title: title,
            message: message,
        });
        // this.$notify({
        //     title: 'Success',
        //     message: 'This is a success message',
        //     type: 'success'
        // });
    },
    flushError({commit, dispatch}, {title, message}) {
        Notification.error({
            title: title,
            message: message
        });
        // this.$notify.error({
        //     title: 'Error',
        //     message: 'This is an error message'
        // });
    },
    setIsHome({commit, dispatch}, bool) {
        commit(types.SET_IS_HOME, bool)
    }
    // setIsWorkRoom ({commit}, flg) {
    //     commit(types.SET_IS_WORKROOM, flg)
    // },
    // flushMessage ({commit}) {
    //     commit(types.SET_ERRORS, [])
    // },
    // setError({commit}, message) {
    //     commit(types.SET_ERRORS, [message])
    // },
    // contact({dispatch}, param) {
    //     return new Promise((resolve, reject) => {
    //         const payload = {
    //             url : '/api/contact',
    //             method: 'post',
    //             param
    //         }
    //         dispatch('api', payload)
    //             .then((_) => {
    //                 resolve()
    //             })
    //             .catch((_) => {
    //                 reject()
    //             })
    //     })
    // },
    // setEntryUrl({commit}, url) {
    //     commit(types.SET_ENTRY_URL, url)
    // },
    // removeEntryUrl({commit}) {
    //     commit(types.REMOVE_ENTRY_URL, url)
    // }
}