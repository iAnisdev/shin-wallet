import API from '@/plugins/API'
import Storage from '@/plugins/Storage'
import Cookies from '@/plugins/cookies'
import router from '@/router'

export const sendSMSCode = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
    API().post('/sh/smsSendVCode.php', data).then((res) => {
        if (res.data.status == 0) {
            resolve(res.data)
        } else {
            reject(res.data);
        }
    }).catch((err) => {
        reject(err);
    });
});


export const userLogin = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
    API().post('/sh/login.php', data).then((res) => {
        if (res.data.status == 0) {
            let userToken = res.data.result.token
            let uid = res.data.result.uid
            let address = res.data.result.address
            let saddress = res.data.result.saddress
            Cookies.setCookie('x-auth-tok', userToken, 18)
            Cookies.setCookie('x-uid', uid, 18)
            Cookies.setCookie('x-address', address, 18)
            Cookies.setCookie('x-saddress', saddress, 18)
            commit('SET_LOGIN_STATUS', true)
            commit('SET_USER_TOKEN', userToken)
            commit('SET_USER_ADDRESS', address)
            commit('SET_USER_SADDRESS', saddress)
            commit('SET_USER_UID', uid)
            router.push('/')
            resolve(res)
        } else {
            reject(res.data);
        }
    }).catch((err) => {
        reject(err);
    });
});


export const userRegister = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
    API().post('/sh/register.php', data).then((res) => {
        if (res.data.status == 0) {
            let userToken = res.data.result.token
            let uid = res.data.result.uid
            let address = res.data.result.address
            let saddress = res.data.result.saddress
            Cookies.setCookie('x-auth-tok', userToken, 18)
            Cookies.setCookie('x-uid', uid, 18)
            Cookies.setCookie('x-address', address, 18)
            Cookies.setCookie('x-saddress', saddress, 18)
            commit('SET_LOGIN_STATUS', true)
            commit('SET_USER_TOKEN', userToken)
            commit('SET_USER_ADDRESS', address)
            commit('SET_USER_SADDRESS', saddress)
            commit('SET_USER_UID', uid)
            dispatch('getUserData', { token: userToken })
            router.push('/')
            resolve(res)
        } else {
            reject(res.data);
        }
    }).catch((err) => {
        reject(err);
    });
});

export const changePassword = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
    API().post('/sh/changepassword.php', data).then((res) => {
        if (res.data.status == 0) {
            resolve(res.data)
        } else {
            reject(res.data);
        }
    }).catch((err) => {
        reject(err);
    });
});

export const changeTPassword = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
    API().post('/sh/transpw.php', data).then((res) => {
        if (res.data.status == 0) {
            resolve(res.data)
        } else {
            reject(res.data);
        }
    }).catch((err) => {
        reject(err);
    });
});

export const changePhoneNumber = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
    API().post('/sh/changephone.php', data).then((res) => {
        if (res.data.status == 0) {
            resolve(res.data)
        } else {
            reject(res.data);
        }
    }).catch((err) => {
        reject(err);
    });
});