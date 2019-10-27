import * as types from './mutation-types'
import { LOGGED_OUT } from '../auth/mutation-types'
import { Notification } from 'element-ui';

export const actions = {
    // api({commit, dispatch}, {url, method, params}) {
    api({commit, dispatch}, datas) {
        return new Promise((resolve, reject) => {
            commit(types.SET_IS_LOADING, true)
            window.axios[datas.method](datas.url, datas.params)
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
                    const errMess = ('errorMessage' in datas) ? datas.errorMessage : '認証の有効期限が切れています。再度ログインをしてください。';
                    const payload = {title: 'Error', message: errMess}
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
    },
    setIsTop({commit, dispatch}, bool) {
        commit(types.SET_IS_TOP, bool)
    },
    sendInformation ({commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/information/store',
                params: params,
                method: 'post'
            }
            dispatch('api', payload)
                .then((res) => {
                    dispatch('flushSuccess', {title: 'Success', message: 'お知らせを送信しました。'})
                    resolve(res)
                }).catch((error) => {
                for(let key in error) {
                    console.log(error)
                    // dispatch('flushError', {title: 'Error', message: error[key][0]})
                }
                // commit(SET_ERRORS, error)
                reject(error)
            })
        })
    },
    editInformation ({commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/information/edit',
                params: params,
                method: 'post'
            }
            dispatch('api', payload)
                .then((res) => {
                    dispatch('fetchInformations');
                    dispatch('flushSuccess', {title: 'Success', message: 'お知らせを編集しました。'})
                    resolve(res)
                }).catch((error) => {
                for(let key in error) {
                    console.log(error)
                    // dispatch('flushError', {title: 'Error', message: error[key][0]})
                }
                // commit(SET_ERRORS, error)
                reject(error)
            })
        })
    },
    fileUpload ({commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/information/fileUpload',
                params: params,
                method: 'post'
            }
            dispatch('api', payload)
                .then((res) => {
                    resolve(res)
                }).catch((error) => {
                    reject(error)
                })
        })
    },
    fetchInformations({commit, dispatch}) {
        return new Promise((resolve, reject) => {
            const payload = {
                url: '/api/information/get',
                method: 'get'
            }
            dispatch('api', payload)
                .then((res) => {

                    // x日前の表示をするための細工
                    for(let i in res) {
                        let date = Moment(res[i].updated_at);
                        date.locale('ja');
                        date.tz('Asia/Tokyo');
                        res[i].displayTime = date.fromNow();
                    }

                    commit('SET_INFORMATIONS', res)
                    resolve(res)
                }).catch((error) => {
                reject(error)
            })
        })
    },
    toggleDialogEditInformation({commit, dispatch}, bool) {
        commit('SET_DIALOG_EDIT_INFORMATION', bool)
    },
    fetchEditInformation({commit, dispatch}, id) {
        return new Promise((resolve, reject) => {
            const payload = {
                url: '/api/information/get/' + id,
                method: 'get'
            }
            dispatch('api', payload)
                .then((res) => {
                    commit('SET_EDIT_INFORMATION', res)
                    resolve(res)
                }).catch((error) => {
                reject(error)
            })
        })
    },
    deleteInformation({commit, dispatch}, id) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/information/delete/' + id,
                method: 'delete'
            }
            dispatch('api', payload)
                .then((res) => {
                    dispatch('fetchInformations');
                    dispatch('flushSuccess', {title: 'Success', message: 'お知らせを削除しました。'})
                    resolve(res)
                }).catch((error) => {
                for(let key in error) {
                    dispatch('flushError', {title: 'Error', message: error[key][0]})
                }
                // commit(SET_ERRORS, error)
                reject(error)
            })
        })
    }


}