import * as types from "./actionType"
import axios from "axios"
import { getLocal } from "../../Utils/localStorage"
import { useToast } from "@chakra-ui/react";

const token = getLocal("token")

const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*"
}

// get posts for home page
export const getPostsHome = (params) => (dispatch) => {

    // console.log(params)

    dispatch({ type: types.GET_POST_REQUEST})
    return axios({
        method: "get",
        url: `/`,
        params: params,
        headers: headers
    })
    .then((res) => {
        // console.log(res)
        dispatch({ type: types.GET_POST_SUCCESS, payload: res.data })
    })
    .catch((err) => {
        dispatch({type: types.GET_POST_FAILURE})
    })
}

// deleted by admin

export const deleteAdminPosts = (id) => (dispatch) => {

    dispatch({ type: types.DELETE_POST_REQUEST})

    // console.log(id)

    return axios({
        method: "delete",
        url: `/delete/${id}`,
        headers: headers,
    })
    .then( (res) => {
        // console.log(res.data)
        return dispatch({ type: types.DELETE_POST_SUCCESS, payload: res.data})
    })
    .catch((err) => {
        // console.log(err);
        dispatch({type: types.DELETE_POST_FAILURE})
    })
}
// get post for signed in page
export const getPosts = (params) => (dispatch) => {

    dispatch({ type: types.GET_POST_REQUEST})
    return axios({
        method: "get",
        url: `/posts`,
        params: params,
        headers: headers
    })
    .then((res) => {
        // console.log(res)
        dispatch({ type: types.GET_POST_SUCCESS, payload: res.data })
    })
    .catch((err) => {
        dispatch({type: types.GET_POST_FAILURE})
    })
}

// get Single Post

export const getPersonalPosts = (id) => (dispatch) => {
    dispatch({ type: types.GET_POST_REQUEST });
    return axios({
      method: "get",
      url: `/posts/${id}`,
      headers: headers,
    })
      .then((res) => {
        dispatch({ type: types.GET_POST_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: types.GET_POST_FAILURE });
      });
  };

// post
export const createPosts = (payload) => (dispatch) => {

    dispatch({ type: types.CREATE_POST_REQUEST})

    return axios({
        method: "post",
        url: `/posts/create`,
        data: payload,
        headers: headers
    })
    .then( (res) => {
        return dispatch({ type: types.CREATE_POST_SUCCESS, payload: res.data})
    })
    .catch((err) => {
        // console.log(err)
        dispatch({type: types.CREATE_POST_FAILURE})
    })
}

// update
export const updatePosts = (payload, id) => (dispatch) => {

    dispatch({ type: types.UPDATE_POST_REQUEST})

    return axios({
        method: "patch",
        url: `/posts/edit/${id}`,
        data: payload,
        headers: headers
    })
    .then( (res) => {
        return dispatch({ type: types.UPDATE_POST_SUCCESS})
    })
    .catch((err) => {
        // console.log(err)
        dispatch({type: types.UPDATE_POST_FAILURE})
    })
}

// delete
export const deletePosts = (id) => (dispatch) => {

    dispatch({ type: types.DELETE_POST_REQUEST})

    return axios({
        method: "delete",
        url: `/posts/delete/${id}`,
        headers: headers
    })
    .then( (res) => {
        return dispatch({ type: types.DELETE_POST_SUCCESS, payload: res.data})
    })
    .catch((err) => {
        // console.log(err.response.data)
        
        return dispatch({type: types.DELETE_POST_FAILURE, payload: err.response.data})
        // return err
    })
}