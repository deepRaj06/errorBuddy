import * as types from './actionType'

const initState = {
    postsData: [],
    errorMsg: {},
    getPosts:{
        isLoading: false,
        isError: false
    },
    createPosts:{
        isLoading: false,
        isError: false
    },
    updatePosts:{
        isLoading: false,
        isError: false
    },
    deletePosts:{
        isLoading: false,
        isError: false
    },
}

export const PostsReducer = (state = initState, action) => {

    const {type, payload} = action

    switch(type){
        case types.GET_POST_REQUEST:
            return{
                ...state,
                getPosts:{
                    isLoading: true,
                    isError: false
                },
            }

        case types.GET_POST_SUCCESS:
            return{
                ...state,
                postsData: payload,
                getPosts:{
                    isLoading: false,
                    isError: false
                },
            }

        case types.GET_POST_FAILURE:
            return{
                ...state,
                getPosts:{
                    isLoading: false,
                    isError: true
                },
            }

        case types.CREATE_POST_REQUEST:
            return{
                ...state,
                createPosts:{
                    isLoading: true,
                    isError: false
                },
            }

        case types.CREATE_POST_SUCCESS:
            return{
                ...state,
                createPosts:{
                    isLoading: false,
                    isError: false
                },
            }

        case types.CREATE_POST_FAILURE:
            return{
                ...state,
                createPosts:{
                    isLoading: false,
                    isError: true
                },
            }

        case types.UPDATE_POST_REQUEST:
            return{
                ...state,
                updatePosts:{
                    isLoading: true,
                    isError: false
                },
            }

        case types.UPDATE_POST_SUCCESS:
            return{
                ...state,
                updatePosts:{
                    isLoading: false,
                    isError: false
                },
            }

        case types.UPDATE_POST_FAILURE:
            return{
                ...state,
                updatePosts:{
                    isLoading: false,
                    isError: true
                },
            }


        case types.DELETE_POST_REQUEST:
            return{
                ...state,
                deletePosts:{
                    isLoading: true,
                    isError: false
                },
            }

        case types.DELETE_POST_SUCCESS:
            return{
                ...state,
                deletePosts:{
                    isLoading: false,
                    isError: false
                },
            }

        case types.DELETE_POST_FAILURE:
            return{
                ...state,
                errorMsg: payload,
                deletePosts:{
                    isLoading: false,
                    isError: true
                },
            }

        default:
            return state
    }
}