import texts from '../../texts';
import { pushMessage } from '../messages/actions';
import { setUsername, botTypingStarted, botTypingStopped } from '../chat/actions';
import { calculate } from '../../utils/calculation';
import { BotName, LocalStorageUserKey } from '../../constants';

export const startChat = () => {
    return function (dispatch) {
        // show typing indication
        dispatch(botTypingStarted());

        // get username from local storage if exists
        const previousUsername = localStorage.getItem(LocalStorageUserKey);
        if (previousUsername) {
            // set username in store
            dispatch(setUsername(previousUsername));
            // handle returning user
            dispatch(handleReturningUser(previousUsername))
        } else {
            // handle new user
            dispatch(handleNewUser());
        }
    }
}

export const handleReturningUser = (previousUsername) => {
    return function (dispatch, getState) {
        // greet user
        setTimeout(() => {
            dispatch(pushMessage({ text: texts.niceToMeetAgain.replace('{0}', previousUsername), user: BotName }));
        }, 1500);

        setTimeout(() => {
            // publish continue message and ask for mathematical expression
            dispatch(pushMessage({ text: texts.continue, user: BotName }));
            // remove bot typing indication
            dispatch(botTypingStopped());
        }, 3000);
    }
};

export const handleNewUser = () => {
    return function (dispatch, getState) {
        // intruduce Maya
        setTimeout(() => {
            // publish introduction message
            dispatch(pushMessage({
                text: texts.introduction, user: BotName
            }));
        }, 1500);

        setTimeout(() => {
            // ask for the username
            dispatch(pushMessage({ text: texts.askForName, user: BotName }));
            // remove bot typing indication
            dispatch(botTypingStopped());
        }, 3000);
    }
};

export const handshake = (message) => {
    return function (dispatch, getState) {
        dispatch(pushMessage({ text: message.text, user: message.user }));

        // simulate bot typing
        setTimeout(() => {
            // show bot typing indication
            dispatch(botTypingStarted());
        }, 500);

        setTimeout(() => {
            // push nice to meet you message - continue typing in the background
            dispatch(pushMessage({ text: texts.niceToMeet.replace('{0}', message.text), user: BotName }));
        }, 2000);

        // push instructions message and stop typing simulation
        setTimeout(() => {
            dispatch(pushMessage({
                text: texts.initialCalculationRequest, user: BotName
            }));
            // remove bot typing indication
            dispatch(botTypingStopped());
        }, 4000);
    }
};

export const calculation = (message) => {
    return function (dispatch, getState) {
        const result = calculate(message.text);

        dispatch(pushMessage(message));

        // show bot typing indication
        dispatch(botTypingStarted());
        dispatch(pushMessage({ text: result, user: BotName }));

        setTimeout(() => {
            dispatch(pushMessage({ text: texts.recalculationRequest, user: BotName }));
            // remove bot typing indication
            dispatch(botTypingStopped());
        }, 1000);
    };
};