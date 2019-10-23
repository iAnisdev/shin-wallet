module.exports = {
    getLoginStatus: (state) => {
        return state.isLoggedIN
    },
    getUserToken: (state) => {
        return state.userToken
    },
    getUserAddress: (state) => {
        return state.address
    },
    getUserSAddress: (state) => {
        return state.saddress
    },
    getUserUID: (state) => {
        return state.uid
    }
}