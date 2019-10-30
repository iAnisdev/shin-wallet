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
            Cookies.setCookie('x-auth-tok', `0x${userToken}`, 20)
            Cookies.setCookie('x-uid', uid, 20)
            Cookies.setCookie('x-address', address, 20)
            Cookies.setCookie('x-saddress', saddress, 20)
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
        console.log('register => ', res)
        if (res.data.status == 0) {
            let userToken = res.data.result.token
            let uid = res.data.result.uid
            let address = res.data.result.address
            let saddress = res.data.result.saddress
            Cookies.setCookie('x-auth-tok', userToken, 20)
            Cookies.setCookie('x-uid', uid, 20)
            Cookies.setCookie('x-address', `0x${userToken}`, 20)
            Cookies.setCookie('x-saddress', saddress, 20)
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

export const addNewPhoneNumber = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
    API().post('/sh/addphone.php', data).then((res) => {
        if (res.data.status == 0) {
            resolve(res.data)
        } else {
            reject(res.data);
        }
    }).catch((err) => {
        reject(err);
    });
});

export const deleteUserPhoneNumber = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
    API().post('/sh/delphone.php', data).then((res) => {
        if (res.data.status == 0) {
            resolve(res.data)
        } else {
            reject(res.data);
        }
    }).catch((err) => {
        reject(err);
    });
});