 import React from 'react';
 import {Link} from 'react-router-dom';
 const Navbar = () => {
     return (
        <nav className="navbar bg-dark">
        <h1>
          <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
        </h1>
        <ul>
          <li><Link to="/profiles">Developers</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
          {/* <li><a href="register.html">Register</a></li>
          <li><a href="login.html">Login</a></li> */}
        </ul>
      </nav>
     )
 }
 
 export default Navbar