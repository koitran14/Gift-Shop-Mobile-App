import { GeneralAction } from "../actions";

const initialState = {
    isApiLoading: true,
    token: '',
}

export default (state = initialState, action) => {
    switch(action.type){
        case GeneralAction.types.SET_IS_APP_LOADING:
            return { ...state, isAppLoading: action.payload };
        case GeneralAction.types.SET_TOKEN: 
            return { ...state, token: action.payload };
        default: return state;
    }    
}

