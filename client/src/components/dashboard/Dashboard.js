import React,{Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';

import {getCurrentProfile} from'../../actions/profile';
import {deleteAccount} from'../../actions/profile';
import Spinner from'../layout/Spinner';
import {Link} from 'react-router-dom';
import DashboardAction from './DashboarAction';
import Experience from './Experience';
import Education from './Education';




const Dashboard= ({getCurrentProfile,
    auth:{user},
    deleteAccount,
    profile:{profile, loading}
})=>{
    useEffect( () =>{
        getCurrentProfile();
    }, []);

    return loading && profile === null ? <Spinner/>: <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            < i ClassName='fas fa-user'></i>
            Welcome { user && user.name }
        </p>
        { profile !== null ?(
            <Fragment>
                    <DashboardAction />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />

                    <div className="my-2">
                        <button className="btn btn-danger" onClick={()=> deleteAccount()}>
                            <i className='fas fa-user-minus' />
                            Delete My Account
                        </button>
                    </div>
                    
            </Fragment>
            
        ) : (
            <Fragment>
                <p> Anda belum memiliki Profile, isi Profile Anda disini</p>
             <Link to ="/create-profile" ClassName="btn btn-primary my-1">
                 Create Profile

             </Link>
             </Fragment>
        )};
    </Fragment>

}
Dashboard.propTypes={
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired

}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile

});

export default connect(mapStateToProps,{getCurrentProfile, deleteAccount })(Dashboard);