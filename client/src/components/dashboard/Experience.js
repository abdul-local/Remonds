import React, { Fragment } from 'react';
import PropTyps from 'prop-types';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import { deleteExperience } from '../../actions/profile';

const Experience = ({experience, deleteExperience}) =>{
    const experiences =experience.map(exp=>(
        <tr>
            <td className='hide-sm'>{exp.company}</td>
            <td className='hide-sm'>{exp.title}</td>
            <td>
                <Moment format ='YYYY/MM/DD'></Moment> -{''}
                {exp.to=== null ? ('Now'):(
                    <Moment format='YYYY/MM/DD'></Moment>

                )}
            </td>
            <td>
                <button className='btn btn-danger'
                onClick={()=> deleteExperience(exp._id)}>
                    Delet
                </button>
            </td>
        </tr>
    ));

    return(
        
        <Fragment>
            <h2 className ='my-2'>Experience</h2>
            <table>
                <thead>
                    <tr>
                    <th>Company</th>
                    <th className='hide-sm'>Title</th>
                    <th className='hide-sm'>Years</th>
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>

            </table>
        
        </Fragment>

    );
};
Experience.prototype={
    experience: PropTyps.array.isRequired,
    deleteExperience: PropTyps.func.isRequired

};
export default connect(null, {deleteExperience})(Experience);