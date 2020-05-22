import { setUsername } from '../chat/actions';
import { handshake, calculation } from '../chat/thunks';

export const publishUserMessage = (message) => {
    return function (dispatch, getState) {
        const state = getState();

        if (!state.chat.username) {
            // if currently no username - we actually got a name message, the handshake flow should run
            dispatch(setUsername(message.text));
            // keep the username in localStorage
            localStorage.setItem('chat-username', message.text);
            // run the handshake flow (nice to meet...)
            dispatch(handshake(message));
        } else {
            // if there is a username - we need to run calculation logic
            dispatch(calculation(message));
        }
    }
};