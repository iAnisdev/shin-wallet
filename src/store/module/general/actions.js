import API from '@/plugins/API'
import Storage from '@/plugins/Storage'
import Cookies from '@/plugins/cookies'
import router from '@/router'
const axios = require('axios')

export const toggelLoader = ({ commit, dispatch }, data) => {
    commit('SET_LOADER_STATUS', data)

}
export const getSpecificTransaction = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/transactionByID.php', data).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data.result)
                commit('SET_CURRENT_TRANSACTION', res.data.result)
            } else {
                reject(res.data);
            }
        }).catch((err) => {
            reject(err);
        });
    })
}
export const calculateExchange = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/calcExchange.php', data).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data.result)
            } else {
                reject(res.data);
            }
        }).catch((err) => {
            reject(err);
        });
    })
}

export const transferAmount = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/transfer.php', data).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

export const transactionsList = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/transactionsOf.php', data).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

export const userNamesList = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/otherunames.php', data).then((res) => {
            if (res.data.status == 0) {
                commit('SET_OTHER_USERNAMES', res.data.usernames)
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

export const addAdditionalAccount = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/addacct.php', data).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

export const getALLCountryList = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(function (response) {
                commit('SET_COUNTRIES_LIST', response.data)
                resolve(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })

    })
}

export const logoutUser = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        resolve()
    })
}
