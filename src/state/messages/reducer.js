import initialState from '../initialState';
import { PUSH_MESSAGE } from './types';

export default function messagesReducer(state = initialState.messages, action) {
    switch (action.type) {
        case PUSH_MESSAGE:
            return Object.assign([], state, [...state, action.message]);
        default:
            return state;
    }
}
