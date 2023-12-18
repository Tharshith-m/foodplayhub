import React from 'react'
import Register from './Register';
import Login from './Login';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div> 
        <ul>
           <Link to='/signup'><li>Register</li></Link>
           <Link to='/'><li>Login</li></Link>
        </ul>
     
    </div>
  )
}

export default Navbar