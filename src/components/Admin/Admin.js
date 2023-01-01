import React, { useState, useTransition } from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase.init';
import AdminMange from '../Hooks/AdminMange';
import { useNavigate } from 'react-router-dom';
const auth = getAuth(app)


const Admin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("")
    const navigate = useNavigate()



    const [admin, setAdmin] = AdminMange()

    const handleAdminLogin = e => {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setAdmin(user);
                navigate("/")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)

                // console.log(errorMessage)
            });
        e.target.reset()

    }

    return (
        <div className='container'  style={{marginTop:"150px"}}>
            <div className='w-sm-25  mx-auto'>
                <h2>Admin Login</h2>
                <form onSubmit={handleAdminLogin}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" id="exampleInputPassword1" required />
                    </div>
                    {
                        error && <div class="alert alert-danger" role="alert">
                            {error}
                        </div>
                    }
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Admin;