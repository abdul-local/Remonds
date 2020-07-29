import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_REPOS
} from './types';

export const getCurrentProfile = () => async dispatch =>{
    try{
        const res= await axios.get('/api/profile/me');
        dispatch({
            type:GET_PROFILE,
            payload: res.data

        });


    }catch (err){
        dispatch({
            type:PROFILE_ERROR,
            payload:{ msg: err.response.statusText, status:err.response.status }

        });

    }
}
export const createProfile =(formData, history, edit =false ) => async dispatch =>{
    try{
        const config ={
            headers: {
                'Content-Type':'application/json'
            }
        }

        const res = await axios.post ('/api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data


        });
        // tambah alert
        dispatch(setAlert(edit ? 'Profile update': 'Profile Create', 'Success'));

        if(!edit){
            history.push('/dashboard')
        }
        
    }catch (err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload:{ msg: err.response.statusText, status: err.response.status
            }
        });

    }

}

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        // Alert
        dispatch(setAlert('Experince Added', 'success'));

        history.push('/dashboard');
        
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
        
    }
}
// Add Education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        // Alert
        dispatch(setAlert('Education Added', 'success'));

        history.push('/dashboard');
        
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
        
    }
}
//Delet Experience
export const deleteExperience = id => async dispatch =>{
    try{
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Removed', 'success'));

    } catch (err){
        dispatch({
            type: PROFILE_ERROR,
            payload:{ msg: err.response.statusText, status: err.response.statusText }

    });
  }
}

//Delet Educattion
export const deleteEducation = id => async dispatch =>{
    try{
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Education Removed', 'succes'));

    } catch (err){
        dispatch({
            type: PROFILE_ERROR,
            payload:{ msg: err.response.statusText, status: err.response.status }

    });
}
}

//Delet Account dan Profile
export const deleteAccount = () => async dispatch =>{
    if (window.confirm('Are you sure? This can Not be undone!')){

    try{
        await axios.delete('/api/profile');
        dispatch({type: CLEAR_PROFILE });
        dispatch({type:ACCOUNT_DELETED});
        dispatch(setAlert('Your account has been permanently deleted '));

    } catch (err){
      

    }
  }
};
// Get all profiles
export const getProfiles=() => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try{
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload:res.data
         }) ;

    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });

    }
}
// Get profile by ID
export const getProfieById = userID => async dispatch =>{
    try{
        const res = await axios.get(`/api/profile/user/$(userID)`)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });

    }
}
// Get GitHUB repos
export const getGithubRepos = username => async dispatch =>{
    try{
        const res= await axios.get(`/api/profile/github/${username}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });

    }
};
