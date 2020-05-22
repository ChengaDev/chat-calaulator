import initialState from '../initialState';
import { SET_USER_NAME, BOT_TYPING_STOPPED, BOT_TYPING_STARTED } from './types';

export default function chatReducer(state = initialState.chat, action) {
    switch (action.type) {
        case SET_USER_NAME:
            return Object.assign({}, state, { username: action.username });
        case BOT_TYPING_STARTED:
            return Object.assign({}, state, { isBotTyping: true });
        case BOT_TYPING_STOPPED:
            return Object.assign({}, state, { isBotTyping: false });
        default:
            return state;
    }
}
