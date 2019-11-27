module.exports = {
    SET_LOADER_STATUS: (state, status) => {
        if (status !== undefined) {
            state.showLoader = status
        } else {
            state.showLoader = !state.showLoader
        }
    },
    SET_CURRENT_TRANSACTION: (state, tran) => {
        state.currentTran = tran
    },
    SET_OTHER_USERNAMES: (state, list) => {
        state.otherUsernames = list
    }
}