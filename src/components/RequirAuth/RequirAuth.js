import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UserAuth from '../Hooks/UserAuth';

const RequirAuth = ({children}) => {
      
     const [user] = UserAuth()
    let location = useLocation()

    if(!user){
         return <Navigate to="/signIn" state={{from:location}} replace></Navigate>
    }
    return (
        children
    );
};

export default RequirAuth;