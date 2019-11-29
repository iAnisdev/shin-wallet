module.exports = {
    showLoaderStatus: (state) => {
        return state.showLoader
    },
    getCurrentTrans: (state) => {
        return state.currentTran
    },
    getUsernameList: (state) => {
        return state.otherUsernames
    },
    getCountryList: (state) => {
        return state.countryList
    }
}