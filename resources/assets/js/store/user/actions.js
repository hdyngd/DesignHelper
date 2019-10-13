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
                    console.log(res);
                    // alert('password: ' + res.password);
                    dispatch('flushSuccess', {title: 'Success', message: res.name + ' 様の登録が完了しました。'})
                    dispatch('sendTempRegistMail', res.email);
                    resolve(res)
                }).catch((error) => {
                    for(let key in error) {
                        dispatch('flushError', {title: 'Error', message: error[key][0]})
                    }
                // commit(SET_ERRORS, error)
                reject(error)
            })
        })
    },
    sendTempRegistMail({dispatch}, email) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/user/sendTempRegistMail/'+email,
                method: 'get'
            }
            dispatch('api', payload)
                .then(() => {})
                .catch((error) => {
                    reject(error)
                })
        })
    },
    signUp ({commit, dispatch}, data) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/user/signUp',
                params: data,
                method: 'post'
            }
            dispatch('api', payload)
                .then((res) => {
                    // alert('password: ' + res.password);
                    dispatch('sendVerifyMail', res.email)
                    dispatch('flushSuccess', {title: 'Success', message: '送付されたメールによりメールアドレスの認証を行ってください。'});
                    router.push('/');
                    resolve(res)
                }).catch((error) => {
                    dispatch('flushError', {title: 'Error', message: 'このメールアドレスは既に登録されています'})
                    // for(let key in error) {
                    //     dispatch('flushError', {title: 'Error', message: error[key][0]})
                    // }
                    // commit(SET_ERRORS, error)
                    reject(error)
                })
        })
    },
    sendVerifyMail({dispatch}, email) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/user/sendVerifyMail/'+email,
                method: 'get'
            }
            dispatch('api', payload)
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    fetchUsers ({commit, dispatch}) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/user/get',
                method: 'get'
            }
            dispatch('api', payload)
                .then((res) => {
                    const roleNameList = {
                        0: '管理者',
                        1: 'クリエイター',
                        2: '一般ユーザー'
                    }

                    for (let key in res) {
                        res[key].roleName = roleNameList[res[key].role]
                    }
                    commit('SET_USERS', res)
                    resolve(res)
                }).catch((error) => {
                // for(let key in error) {
                //     dispatch('flushError', {title: 'Error', message: error[key][0]})
                // }
                // commit(SET_ERRORS, error)
                reject(error)
            })
        })
    },
    editProfile ({commit, dispatch}, data) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/user/edit',
                params: data,
                method: 'post'
            }
            dispatch('api', payload)
                .then((res) => {
                    dispatch('fetchMe');
                    dispatch('fetchUsers');

                    // email変更の有無によってメッセージを変える。
                    if(res) {
                        dispatch('flushSuccess', {title: 'Success', message: 'Emailはまだ変更されていません。送付されたメールにより認証を行ってください。'})
                    } else {
                        dispatch('flushSuccess', {title: 'Success', message: 'ユーザー情報を変更しました。'})
                    }


                    resolve(res)
                }).catch((error) => {
                for(let key in error) {
                    dispatch('flushError', {title: 'Error', message: error[key][0]})
                }
                // commit(SET_ERRORS, error)
                reject(error)
            })
        })
    },
    fetchEditUser({commit, dispatch}, id) {
        return new Promise((resolve, reject) => {
            const payload = {
                url: '/api/user/get/' + id,
                method: 'get'
            }
            dispatch('api', payload)
                .then((res) => {
                    commit('SET_EDIT_USER', res)
                    resolve(res)
                }).catch((error) => {
                    reject(error)
                })
        })
    },
    toggleDialogEditUser({commit, dispatch}, bool) {
        commit('SET_DIALOG_EDIT_USER', bool)
    },
    deleteUser({commit, dispatch}, id){
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/user/delete/' + id,
                method: 'delete'
            }
            dispatch('api', payload)
                .then((res) => {
                    dispatch('fetchUsers');
                    dispatch('flushSuccess', {title: 'Success', message: 'ユーザーを削除しました。'})
                    resolve(res)
                }).catch((error) => {
                for(let key in error) {
                    dispatch('flushError', {title: 'Error', message: error[key][0]})
                }
                // commit(SET_ERRORS, error)
                reject(error)
            })
        })
    },
    emailVerify({dispatch}, token) {
        return new Promise((resolve, reject) => {
            const payload = {
                url: '/api/user/emailVerify/' + token,
                method: 'get'
            }
            dispatch('api', payload)
                .then((res) => {
                    dispatch('fetchMe');
                    dispatch('flushSuccess', {title: 'Success', message: 'Emailアドレスが認証されました。'})
                    router.push('/');
                    resolve(res)
                }).catch((error) => {
                    dispatch('flushError', {title: 'Error', message: '無効なリンクです。'})
                    router.push('/');
                    reject(error)
            })
        })
    },
    signUpEmailVerify({dispatch}, token) {
        return new Promise((resolve, reject) => {
            const payload = {
                url: '/api/user/signUpEmailVerify/' + token,
                method: 'get'
            }
            dispatch('api', payload)
                .then((res) => {
                    dispatch('flushSuccess', {title: 'Success', message: 'Emailアドレスが認証されました。'})
                    router.push('/');
                    resolve(res)
                }).catch((error) => {
                dispatch('flushError', {title: 'Error', message: '無効なリンクです。'})
                router.push('/');
                reject(error)
            })
        })
    }

}