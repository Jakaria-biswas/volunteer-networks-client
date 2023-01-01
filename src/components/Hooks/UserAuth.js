import { useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import app from "../../firebase.init";
import { useNavigate } from "react-router-dom";
const auth = getAuth(app)

const UserAuth = () => {
    const [user, setUser] = useState({})

    const navigate = useNavigate()
    

    useEffect(() => {
          
        onAuthStateChanged(auth, user => {
              setUser(user)
        })

      },[])


   return [user, setUser]


}

export default UserAuth;