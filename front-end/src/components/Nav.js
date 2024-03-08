import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('user');
        navigate("/Signup");
    }

    return (
        <div>
            {auth ? (
                <ul className="nav-ul">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/add">Add product</Link></li>
                    <li><Link to="/update/:id">Update product</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link onClick={logout} to="/Signup">Logout( {JSON.parse(auth).name} )</Link></li>
                </ul>
            ) : (
                <ul className='nav-ul'>
                    <li><Link to="/Signup">Sign up</Link></li>
                    <li><Link to="/Login">Login</Link></li>
                </ul>
            )}
        </div>
    )
}

export default Nav;
