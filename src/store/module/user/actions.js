import API from '@/plugins/API'
import Storage from '@/plugins/Storage'
import Cookies from '@/plugins/cookies'
import router from '@/router'

export const getUserData = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/userdata.php', data).then((res) => {
            if (res.data.status == 0) {
                let userData = res.data.result
                let userToken = userData.tok
                let uid = userData.uid
                let address = userData.addresses.find(function (address) {
                    return address.atype == 'checking';
                }).address;
                let saddress = userData.addresses.find(function (address) {
                    return address.atype == 'saving';
                }).address;
                Cookies.setCookie('x-auth-tok', userToken, 20)
                Cookies.setCookie('x-uid', uid, 20)
                Cookies.setCookie('x-address', address, 20)
                Cookies.setCookie('x-saddress', saddress, 20)
                commit('SET_USER_DATA', userData)
                resolve(userData)
            } else {
                reject(res.data);
            }
        }).catch((err) => {
            reject(err);
        });
    })
}
export const getDataFromCookies = ({ commit, dispatch }) => {
    try {
        let userToken = Cookies.getCookies('x-auth-tok')
        if (userToken) {
            let address = Cookies.getCookies('x-address')
            let saddress = Cookies.getCookies('x-saddress')
            let uid = Cookies.getCookies('x-uid')
            commit('SET_LOGIN_STATUS', true)
            commit('SET_USER_TOKEN', userToken)
            commit('SET_USER_ADDRESS', address)
            commit('SET_USER_SADDRESS', saddress)
            commit('SET_USER_UID', uid)
            dispatch('getUserData', { token: userToken })
        }
    } catch (e) {
        console.log(e)
    }
}
export const getWalletBalanceByAddress = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/balanceOf.php', data).then((res) => {
            if (res.data.status == 0) {
                let balance = res.data.result
                resolve(balance)
            } else {
                reject(res.data);
            }
        }).catch((err) => {
            reject(err);
        });
    })
}
export const getAccountBalance = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/balanceOf.php', data).then((res) => {
            if (res.data.status == 0) {
                let balance = res.data.result
                dispatch('getAccountBalanceCNY', balance)
                dispatch('getAccountBalanceUSDT', balance)
                commit('SET_ACCOUNT_BALANCE', balance)
                resolve(res.data.result)
            } else {
                reject(res.data);
            }
        }).catch((err) => {
            reject(err);
        });
    })
}
export const getAccountBalanceCNY = ({ commit, dispatch }, data) => {
    let dataObj = {
        amount: data,
        from: 'SHIN',
        to: 'CNY'
    }
    dispatch('calculateExchange', dataObj).then((res) => {
        commit('SET_ACCOUNT_BALANCE_CNY', res)
    }).catch((err) => {
        console.log('getAccountBalanceCNY err ', err)
    })
}

export const getAccountBalanceUSDT = ({ commit, dispatch }, data) => {
    let dataObj = {
        amount: data,
        from: 'SHIN',
        to: 'USDT'
    }
    dispatch('calculateExchange', dataObj).then((res) => {
        commit('SET_ACCOUNT_BALANCE_USDT', res)
        dispatch('getSHINSTATES')
    }).catch((err) => {
        console.log('getAccountBalanceUSDT err ', err)
    })
}
export const getSHINSTATES = ({ commit, dispatch }) => {
    let symbolArr = [
        {
            from: "USDT",
            to: "BTC"
        },
        {
            from: "SHIN",
            to: "BTC"
        },
        {
            from: "USDT",
            to: "ETH"
        },
        {
            from: "SHIN",
            to: "ETH"
        },
        {
            from: "USDT",
            to: "XRP"
        },
        {
            from: "SHIN",
            to: "XRP"
        },
        {
            from: "USDT",
            to: "EOS"
        },
        {
            from: "SHIN",
            to: "EOS"
        }
    ]
    let values = [{
        name: "BTC"
    }, {
        name: "ETH"
    }, {
        name: "XRP"
    }, {
        name: "EOS"
    }]
    API().post('/sh/exchangePair.php', symbolArr).then((res) => {
        if (res.data.status == 0) {
            let balance = res.data.result
            balance.forEach(symbol => {
                values.forEach(val => {
                    if (symbol.to == val.name) {
                        if (symbol.from == 'USDT') {
                            val.usdt = symbol.rate
                        } else {
                            val.shin = symbol.rate
                        }
                        val.percentage = (function () {
                            var precision = 10000; // 5 decimals
                            var randomnum = Math.floor(Math.random() * (1.5 * precision - 1 * precision) + 1 * precision) / (1 * precision)
                            return randomnum.toFixed(3)
                        }())
                    }
                });
            });
            commit('SET_ECHANGE_VALUE', values)
        } else {
            reject(res.data);
        }
    }).catch((err) => {
        reject(err);
    });
}