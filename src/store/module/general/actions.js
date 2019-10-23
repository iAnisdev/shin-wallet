import API from '@/plugins/API'
import Storage from '@/plugins/Storage'
import Cookies from '@/plugins/cookies'
import router from '@/router'
import { reject } from 'q'

export const toggelLoader = ({ commit, dispatch }, data) => {
    commit('SET_LOADER_STATUS')
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
