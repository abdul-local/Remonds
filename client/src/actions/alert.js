import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';
const id = uuid.v4();

export const setAlert = (msg, alertType) => dispatch ={
    
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id}
    });

};
