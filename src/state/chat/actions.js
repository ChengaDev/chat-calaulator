import { SET_USER_NAME, BOT_TYPING_STARTED, BOT_TYPING_STOPPED } from './types';

export const botTypingStarted = () => ({
    type: BOT_TYPING_STARTED,
});

export const botTypingStopped = () => ({
    type: BOT_TYPING_STOPPED
});

export const setUsername = (username) => ({
    type: SET_USER_NAME,
    username
});

export default { setUsername, botTypingStarted, botTypingStopped };
