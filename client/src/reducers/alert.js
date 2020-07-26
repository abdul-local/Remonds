import { SET_ALERT,REMOVE_ALERT } from '../actions/types';
import { v4 as uuid} from 'uuid';
const initialState = [];

export default function(state = initialState, action){
    const { type, payload} = action;

    switch (type) {
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload);
        default:
            return state;
        
    }

}