import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {
    // membuat link auth dan guest non auth
    const authLink=(
        <ul>
            <li>
        <Link to="/profiles">Members </Link>
           </li>
           <li>
           <Link to="/dashboard" >
             <i className='fas fa-user' />{' '}
              <span className='hide-sm'>Dashboard</span>
              </Link>
         </li>
         <li>
           <a onClick={logout} href='#!'>
             <i className='fas fa-sign-out-alt' />{' '}
              <span className='hide-sm'>Logout</span>
            </a>
         </li>
     </ul>
    );
    const guestLinks =(
        <ul>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li>
        <Link to="/profiles">Members </Link>
           </li>
        </ul>

    )
 return (
    // copy dan paste navbar dari remonds-theme disini, dan rubah class menjadi className
    <nav className="navbar bg-dark">
    <h1>
    <a href="/"><i className="fas fa-code"></i> Remonds App</a>
    </h1>
    { !loading && (<Fragment>{ isAuthenticated ? authLink: guestLinks}</Fragment>)}
    </nav>
    )
    };
// protypes
Navbar.propTypes={
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps,{logout}) (Navbar);