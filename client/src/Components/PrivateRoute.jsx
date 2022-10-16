import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const token = useSelector( (store) => store.AuthReducer.token);
    const store = useSelector((store) => store);
    // console.log(store);

    const location  = useLocation()
    // console.log(token);

    // if(token && token !== undefined)
    if(token)
    {
        return children
    }
    return <Navigate to="/login" state={{from: location}} replace />;
}

export default PrivateRoute