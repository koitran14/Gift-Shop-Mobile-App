const types = {
    SET_IS_APP_LOADING: 'SET_IS_APP_LOADING',
    SET_TOKEN: 'SET_TOKEN',
    SET_USER: 'SET_USER',
}

const setIsAppLoading = isAppLoading => {
    return {
        type: types.SET_IS_APP_LOADING,
        payload: isAppLoading,
    }
}

const setToken = token => {
    return {
        type: types.SET_TOKEN,
        payload: token,
    }
}

const setUser = user => {
    return {
        type: types.SET_USER,
        payload: user,
    }
}

export default { setIsAppLoading, setToken, setUser, types };