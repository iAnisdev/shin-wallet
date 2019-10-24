module.exports = {
    SET_LOADER_STATUS: (state , status) =>{
        state.showLoader = !state.showLoader
    },
    SET_CURRENT_TRANSACTION: (state , tran) =>{
        state.currentTran = tran
    },
}