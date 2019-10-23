module.exports = {
    SET_LOGIN_STATUS: (state, status) => {
        state.isLoggedIN = status
    },
    SET_USER_TOKEN: (state, status) => {
        state.userToken = status
    },
    SET_USER_ADDRESS: (state, status) => {
        state.address = status
    },
    SET_USER_SADDRESS: (state, status) => {
        state.saddress = status
    },
    SET_USER_UID: (state, status) => {
        state.uid = status
    }
}