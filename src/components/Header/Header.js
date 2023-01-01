import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import app from '../../firebase.init';
import brandLogo from '../../images/brandLogo.png'
import AdminMange from '../Hooks/AdminMange';
import UserAuth from '../Hooks/UserAuth';
import './Header.css';

const auth = getAuth(app);



const Header = () => {
    const [admin, setAdmin] = AdminMange();
    const [user, setUser] = UserAuth()

    const navigate = useNavigate()


    /// admin logout
    const handleLogOut = () => {

        signOut(auth)
            .then(() => {
                // Sign-out successful.
                navigate('/')
            }).catch((error) => {
                // An error happened.
            });
    }

    // signOut user 
    const handleSignOutUser = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/')
          }).catch((error) => {
            // An error happened.
          });
    }
    return (
        <div className='bg-light fixed-top'>
            <div className='container '>
                <nav class="navbar navbar-expand-lg bg-light" >
                    <div class="container-fluid">
                        <img className='navbar-brand w-25' src={brandLogo} alt="" />
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav ms-auto">
                                <li className='nav-link'><NavLink to="/">Home</NavLink></li>
                                <li className='nav-link'><NavLink to="donation">Donation</NavLink></li>
                                <li className='nav-link'><NavLink>Events</NavLink></li>
                                {/* <li className='nav-link' ><NavLink>Books</NavLink></li> */}

                                {user &&
                                    <>
                                    <li className='nav-link' ><NavLink> {user.displayName}</NavLink></li>
                                    </>
                                    }
                                {admin?.email === "contactjakaria95@gmail.com" ? <li className='nav-link '><NavLink className="bold" to="/manageEvent">Manage event</NavLink></li> : 
                                
                               user ? <li className='nav-link ' ><button onClick={handleSignOutUser} className='btn btn-danger btn-sm '><NavLink to="" className="text-white">Sign Out</NavLink></button></li> : <li className='nav-link ' ><button className='btn btn-success btn-sm '><NavLink to="/signIn" className="text-white">Sign in</NavLink></button></li>
                                
                                }

                                {
                                    admin?.email === "contactjakaria95@gmail.com" ? <> <li className='nav-link ' ><button className='btn btn-success btn-sm '><NavLink to="/add" className="text-white">add</NavLink></button></li>  <li className='nav-link ' ><button onClick={handleLogOut} className='btn btn-danger btn-sm '><NavLink className="text-white">Logout</NavLink></button></li>   </> : user? "" : <li className='nav-link' ><button className='btn btn-dark btn-sm'><NavLink to="/admin" className="text-white">Admin</NavLink></button></li>
                                }
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Header;