import React,{useState, Fragment,useEffect} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProfile,getCurrentProfile} from '../../actions/profile';

const EditProfile = ({profile:{profile,loading},createProfile,getCurrentProfile,history}) => {

    const [formData,setFormData] = useState({
        company:'',
        website:'',
        location:'',
        status:'',
        skills:'',
        githubusername:'',
        bio:'',
        facebook:'',
        linkedin:'',
        twitter:'',
        youtube:'',
        instagram:''
    });
    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        facebook,
        linkedin,
        twitter,
        youtube,
        instagram
        } = formData;

    const [displaySocialInputs, toggleSocialInputs] = useState(false);
    
    useEffect(()=>{
        getCurrentProfile();

        setFormData({
            company: loading || !profile.company ? '': profile.company,
            website: loading || !profile.website ? '': profile.website,
            location: loading || !profile.location ? '': profile.location,
            status: loading || !profile.status ? '': profile.status,
            skills: loading || !profile.skills ? '': profile.skills,
            githubusername: loading || !profile.githubusername ? '': profile.githubusername,
            bio: loading || !profile.bio ? '': profile.bio,
            twitter: loading || !profile.social ? '': profile.social.twitter,
            facebook: loading || !profile.social ? '': profile.social.facebook,
            youtube: loading || !profile.social ? '': profile.social.youtube,
            instagram: loading || !profile.social ? '': profile.social.instagram,
            linkedin: loading || !profile.social ? '': profile.social.linkedin
        })
    },[loading]);
    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmit = e =>{
        e.preventDefault();
        createProfile(formData,history,true);
    }
    return (
        <Fragment>
                <h1 className="large text-primary">Create your profile</h1>
                <p className="lead">
                    <i className="fas fa-user"> Let's get some information to make your profile standout</i>
                </p>
                <small>* required field</small>
                <form class="form" onSubmit={e=>onSubmit(e)}>
                    <div class="form-group">
                        <select name="status" value={status} onChange={e => onChange(e)}>
                            <option value="0">* Select Professional Status</option>
                            <option value="Developer">Developer</option>
                            <option value="Junior Developer">Junior Developer</option>
                            <option value="Senior Developer">Senior Developer</option>
                            <option value="Manager">Manager</option>
                            <option value="Student or Learning">Student or Learning</option>
                            <option value="Instructor">Instructor</option>
                            <option value="Intern">Intern</option>
                            <option value="Other">Other</option>
                        </select>
                        <small className="form-text">Give us an idea of where you are at your career</small>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Company" name="company" value={company} onChange={e => onChange(e)}/>
                        <small className="form-text">Could be your own or one you work for</small>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Website" name="website" value={website} onChange={e => onChange(e)}/>
                        <small className="form-text">Could be your own or one you work for</small>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)}/>
                        <small className="form-text">City & state suggested (eg.Jaipur,Rajasthan)</small>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => onChange(e)}/>
                        <small className="form-text">Please use comma seperated names (eg. HTML,CSS,JS)</small>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Github Username" name="githubusername" value={githubusername} onChange={e => onChange(e)}/>
                        <small className="form-text">Include your github username</small>
                    </div>
                    <div className="form-group">
                        <textarea  placeholder="A short bio about yourself" name="bio" value={bio} onChange={e => onChange(e)}/>
                        <small className="form-text">Tell us a little about yourself</small>
                    </div>
                    <div className="my-2">
                        <button type="button" onClick={()=>toggleSocialInputs(!displaySocialInputs)} class="btn btn-light">
                            Add Social Network Links
                        </button>
                        <span>Optional</span>
                    </div>
                    {!displaySocialInputs?"":<Fragment>

                    <div className="form-group social-input">
                        <i className="fab fa-twitter fa-2x"></i>
                        <input type="text" placeholder="Twitter Url" name="twitter" value={twitter} onChange={e => onChange(e)}/>
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-facebook fa-2x"></i>
                        <input type="text" placeholder="Facebook Url" name="facebook" value={facebook} onChange={e => onChange(e)}/>
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-youtube fa-2x"></i>
                        <input type="text" placeholder="Youtube Url" name="youtube" value={youtube} onChange={e => onChange(e)}/>
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-linkedin fa-2x"></i>
                        <input type="text" placeholder="Linkedin Url" name="linkedin" value={linkedin} onChange={e => onChange(e)}/>
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-instagram fa-2x"></i>
                        <input type="text" placeholder="Instagram Url" name="instagram" value={instagram} onChange={e => onChange(e)}/>
                    </div>
                    </Fragment>
                }
                   
                    <input type="submit" className="btn btn-primary my-1"/>
                    <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
                </form>
        </Fragment>
    )
}


EditProfile.propTypes={
    createProfile:PropTypes.func.isRequired ,
    getCurrentProfile:PropTypes.func.isRequired,
    profile:PropTypes.bool.isRequired   
}

const mapStateToProps =state=>({
    profile:state.profile
});

export default connect(mapStateToProps,{createProfile,getCurrentProfile})(withRouter(EditProfile));
