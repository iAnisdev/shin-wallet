module.exports = {
    userData: (state) => {
        return state.userData
    },
    getAccountBalanceSHIN: (state) => {
        return state.balanceOf
    },
    getAccountBalanceCYN: (state) => {
        return state.balanceOfCYN
    },
    getAccountBalanceUSDT: (state) => {
        return state.balanceOFUSDT
    },
    getExchangeValues: (state) => {
        return state.generalExchangeValues
    },
    getUserCAddress: (state) => {
        return state.userAddress
    },
    getUserERCAddress: (state) => {
        return state.userErcAddress
    },
    getUserPhone: (state) => {
        return state.userPhone
    }
}