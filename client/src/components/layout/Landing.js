import React from 'react';
import {Link} from 'react-router-dom';

const Landing = () => {
    return (
        <div>
             <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            {/* <a href="register.html" className="btn btn-primary">Sign Up</a> */}
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-primary">Login</Link>
            {/* <a href="login.html" className="btn btn-light">Login</a> */}
          </div>
        </div>
      </div>
    </section>
        </div>
    )
}

export default Landing