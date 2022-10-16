import { USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT_FAILURE, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_SIGNUP_FAILURE, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "./actionType"
import * as types from "./actionType"
import axios from "axios"

const headers = {
    "Content-Type": "application/json",
}

// get usersDetails
export const getUsers = (params) => (dispatch) => {

    dispatch({ type: types.USER_LOGIN_REQUEST})
    return axios({
        method: "get",
        url: `/user`,
        params: params,
        headers: headers
    })
    .then((res) => {
        console.log(res)
        dispatch({ type: types.USER_LOGIN_SUCCESS, payload: res.data })
    })
    .catch((err) => {
        dispatch({type: types.USER_LOGIN_FAILURE})
    })
}


export const signupRequest = () => {
    return {
        type: USER_SIGNUP_REQUEST,
    }
}
export const signupSuccess = (payload) => {
    return {
        type: USER_SIGNUP_SUCCESS,
        payload
    }
}
export const signupFailure = () => {
    return {
        type: USER_SIGNUP_FAILURE,
    }
}

// LOGIN
export const loginRequest = () => {
    return {
        type: USER_LOGIN_REQUEST,
    }
}
export const loginSuccess = (payload) => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload
    }
}
export const loginFailure = () => {
    return {
        type: USER_LOGIN_FAILURE,
    }
}

// LOGOUT
export const logoutRequest = () => {
    return {
        type: USER_LOGOUT_REQUEST,
    }
}
export const logoutSuccess = () => {
    return {
        type: USER_LOGOUT_SUCCESS,
    }
}
export const logoutFailure = () => {
    return {
        type: USER_LOGOUT_FAILURE,
    }
}