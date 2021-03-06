import React,{useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import Spinner from '../layout/Spinner';

const Dashboard = ({
    getCurrentProfile,
    auth:{user},
    profile:{loading,profile
    }}) => {

    useEffect(()=>{
        getCurrentProfile();
    },[]);
    return loading && profile === null?<Spinner/> :<Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user">Welcome {user && user.name} </i>
        </p>
        { profile !== null ? <Fragment>
            <DashboardActions/>
            <Experience experience={profile.experience}/>
            <Education education={profile.education}/>
            </Fragment>:<Fragment>
        <p>You have not setup your profile ,please add some info</p>
            <Link to="/create-profile" className="btn btn-primary  my-1">Create Profile</Link>
        </Fragment>}
        
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.bool.isRequired,
    profile:PropTypes.object.isRequired
}

const mapStateToProps= state =>({
    auth:state.auth,
    profile:state.profile
});

export default connect(mapStateToProps,{getCurrentProfile})(Dashboard);
