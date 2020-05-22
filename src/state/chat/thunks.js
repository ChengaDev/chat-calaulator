import texts from '../../texts';
import { pushMessage } from '../messages/actions';
import { setUsername, botTypingStarted, botTypingStopped } from '../chat/actions';
import { calculate } from '../../utils/calculation';

export const startChat = () => {
    return function (dispatch) {
        // show typing indication
        dispatch(botTypingStarted());

        // get username from local storage if exists
        const previousUsername = localStorage.getItem('chat-username');
        if (previousUsername) {
            // set username in store
            dispatch(setUsername(previousUsername));
            dispatch(handleReturningUser(previousUsername))
        } else {
            dispatch(handleNewUser());
        }
    }
}

export const handleReturningUser = (previousUsername) => {
    return function (dispatch, getState) {
        // greet user
        setTimeout(() => {
            dispatch(pushMessage({ text: texts.niceToMeetAgain.replace('{0}', previousUsername), user: "Maya" }));
        }, 1500);

        // ask for mathematical expression
        setTimeout(() => {
            dispatch(pushMessage({ text: texts.continue, user: "Maya" }));
            dispatch(botTypingStopped());
        }, 3000);
    }
};

export const handleNewUser = () => {
    return function (dispatch, getState) {
        // intruduce Maya
        setTimeout(() => {
            dispatch(pushMessage({ text: texts.introduction, user: "Maya" }));
        }, 1500);

        // ask for the username
        setTimeout(() => {
            dispatch(pushMessage({ text: texts.askForName, user: "Maya" }));
            dispatch(botTypingStopped());
        }, 3000);
    }
};

export const handshake = (message) => {
    return function (dispatch, getState) {
        dispatch(pushMessage({ text: message.text, user: message.user }));

        // simulate bot typing
        setTimeout(() => {
            dispatch(botTypingStarted());
        }, 500);

        // push nice to meet you message - continue typing in the background
        setTimeout(() => {
            dispatch(pushMessage({ text: texts.niceToMeet.replace('{0}', message.text), user: "Maya" }));
        }, 2000);

        // push instructions message and stop typing simulation
        setTimeout(() => {
            dispatch(pushMessage({ text: texts.initialCalculationRequest, user: "Maya" }));
            dispatch(botTypingStopped());
        }, 4000);
    }
};

export const calculation = (message) => {
    return function (dispatch, getState) {
        const result = calculate(message.text);

        dispatch(pushMessage(message));

        dispatch(botTypingStarted());
        dispatch(pushMessage({ text: result, user: "Maya" }));

        setTimeout(() => {
            dispatch(pushMessage({ text: texts.recalculationRequest, user: "Maya" }));
            dispatch(botTypingStopped());
        }, 2000);
    };
};