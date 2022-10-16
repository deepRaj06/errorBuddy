import { getLocal, saveLocal } from "../../Utils/localStorage";
import { USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS, USER_SIGNUP_FAILURE, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "./actionType";

const initState = {
    usersData: [],
    token: getLocal("token") || false,
    user: getLocal("user") || {},
    isAuthLoading: false,
    isError: false
}

export const AuthReducer = (state = initState, action) => {
    const {type, payload} = action;

    switch(type){
        case USER_SIGNUP_REQUEST:
            return {
                ...state,
                isAuthLoading: true,
                isError: false
            };
        case USER_SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthLoading: false,
                isError: false
            };
        case USER_SIGNUP_FAILURE:
            return {
                ...state,
                isAuthLoading: false,
                token: null,
                isError: true
            };
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                isAuthLoading: true,
                isError: false
            };
        case USER_LOGIN_SUCCESS:
            saveLocal("token", payload.token);
            saveLocal("user", payload.user);
            return {
                ...state,
                usersData: payload,
                isAuthLoading: false,
                token: payload.token,
                user: payload.user,
                isError: false
            };
        case USER_LOGIN_FAILURE:
            return {
                ...state,
                isAuthLoading: false,
                token: null,
                isError: true
            };
        case USER_LOGOUT_SUCCESS:
        return {
            ...state,
            isAuthLoading: false,
            token: null,
            user: {},
            isError: false
        };

        default:
            return state
    }
}