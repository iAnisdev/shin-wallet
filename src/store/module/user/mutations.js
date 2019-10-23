module.exports = {
    SET_USER_DATA: (state , data) =>{
        state.userData = data
    },
    SET_ACCOUNT_BALANCE: (state , data) =>{
        state.balanceOf = data
    },
    SET_ACCOUNT_BALANCE_CNY: (state , data) =>{
        state.balanceOfCYN = data
    },
    SET_ACCOUNT_BALANCE_USDT: (state , data) =>{
        state.balanceOFUSDT = data
    },
    SET_ECHANGE_VALUE: (state , data) => {
        state.generalExchangeValues = data
    },
    
}