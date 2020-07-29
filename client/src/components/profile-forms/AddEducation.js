import React , {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const AddEducation = ({ addEducation, history }) =>{
    const [ formData, setFormData] = useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        from:'',
        to:'',
        current: false,
        description:''
    });
    // state untuk current : true
    const [toDateDisabled, toggleDisable]= useState(false);
    const {school, degree,fieldofstudy,from,  to, current,description}= formData;
    // onChange handle
    const onChange = e => setFormData ({...formData, [ e.target.name]: e.target.value});

    return (
        <Fragment>
         <h1 class="large text-primary">
      Add An Education
    </h1>
    <p className="lead">
      <i className="fas fa-code-branch"></i> Add any Education that you have had in the past
    </p>
    <small>* = required field</small>
    <form className="form" autoComplete= "off" onSubmit={ e =>{
        e.preventDefault();
        addEducation(formData, history)
    }}>
        <div className="form-group">
            <input type="text" 
            placeholder="* School or Bootcamp" 
            name="school" 
            value ={school}
            onChange={e => onChange(e)}
            required />
        </div>
        <div className="form-group">
            <input type="text"
             placeholder="* Degree or Certificate" 
             name="degree"
             value ={degree}
            onChange={e => onChange(e)}
              required />
        </div>
        <div className="form-group">
            <input type="text"
             placeholder="Filed of Study"
              name="fieldofstudy"
              value ={fieldofstudy}
            onChange={e => onChange(e)}
             />
        </div>
        <div className="form-group">
            <h4>From Date</h4>
            <input 
            type="date" 
            name="from" 
            value ={from}
            onChange={e => onChange(e)}
            />
        </div>
        <div className="form-group">
            <p><input 
            type="checkbox"
            name="current" 
            value ={current}
            onChange={e => {
                setFormData({...formData,current: !current });
                toggleDisable(!toDateDisabled);
            }}
            />{''} 
            Current Education</p>
        </div>

        <div className="form-group">
            <h4>To Date</h4>
            <input type="date"
             name="to"
             value ={to}
            onChange={e => onChange(e)}
            disabled={toDateDisabled ? 'disabled': ''}
             />
        </div>
        <div className="form-group">
            <textarea 
                name="description"
                cols="30"
                rows="5"
                placeholder="Program Description"
                value ={description}
                onChange={e => onChange(e)}
            />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">
        Go Back
        </a>
    </form>


        </Fragment>

    );
};
AddEducation.propTypes ={
    addEducatione: PropTypes.func.isRequired

}
export default connect (null,{addEducation})(withRouter (AddEducation));