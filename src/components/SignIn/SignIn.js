import React from 'react';
import './SignIn.css';
import { FcGoogle } from "react-icons/fc";

import app from '../../firebase.init';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import UserAuth from '../Hooks/UserAuth';
const auth = getAuth(app)


const SignIn = () => {

     const [user, setUser] = UserAuth()
     const provider = new GoogleAuthProvider();
     const navigate = useNavigate()
     const location = useLocation();
     // const from = location?.state?.from.pathName || '/'
     const from = location?.state?.from.pathname || '/'
     const handleGoogleSignIn = () => {

          signInWithPopup(auth, provider)
              .then(result => {
                  const user = result.user;
               //    navigate(from, {replace:true})
                  setUser(user)
                  navigate(from , {replace:true})
  
              })
              .catch(error => {
                  const errorMessage = error.message;
                  console.log(errorMessage)
              })
      }
     return (
          <div className='container' style={{ marginTop: "150px" }}>
               <div className='box mx-auto'>
                    <h3>Login With</h3>
                    <button onClick={handleGoogleSignIn} ><FcGoogle style={{ fontSize: "45px" }} /> Continue with Google</button>
               </div>
          </div>
     );
};

export default SignIn;