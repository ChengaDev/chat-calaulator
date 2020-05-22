import { combineReducers } from 'redux';
import messagesReducer from './state/messages/reducer';
import chatReducer from './state/chat/reducer';

const rootReducer = combineReducers({
    chat: chatReducer,
    messages: messagesReducer
});

export default rootReducer;
