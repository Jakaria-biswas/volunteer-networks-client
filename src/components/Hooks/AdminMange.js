import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import app from "../../firebase.init";

const auth = getAuth(app)
const AdminMange = () => {


    const [admin, setAdmin] = useState({})
    



      useEffect(() => {
          
        onAuthStateChanged(auth, admin => {
              setAdmin(admin)
        })

      },[])


    return [admin, setAdmin]

}

export default AdminMange;