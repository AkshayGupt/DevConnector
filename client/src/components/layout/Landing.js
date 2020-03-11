import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link,Redirect} from 'react-router-dom';
import { Z_PARTIAL_FLUSH } from 'zlib';

const Landing = ({auth:{isAuthenticated,loading}}) => {

const authView=(
  <div>
 <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Welcome to DevConnector!
          </p>
          <div className="buttons">
            
            <Link to="/dashboard" className="btn btn-primary">Dashboard</Link>

          </div>
          </div>
);
const guestView=(
  <div>
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
);


    return (
        <div>
             <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
         {!isAuthenticated && !loading ? guestView : authView}
        </div>
      </div>
    </section>
        </div>
    )
}

Landing.propType = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
  auth: state.auth
});

export default connect(mapStateToProps) (Landing);