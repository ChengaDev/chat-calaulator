import { createSelector } from 'reselect';
import botAvatar from '../../images/mayas_avatar.png';
import userAvatar from '../../images/user_avatar.png';
import { SelfUsername } from '../../constants';

export const messagesSelector = (state) => state.messages;

export const messagesBlocksSelector = createSelector(messagesSelector, (messages) => {
    if (!messages || messages.length === 0) return null;

    let result = [];
    let lastSender = '';
    messages.forEach(message => {
        if (lastSender !== message.user) {
            result.push({
                user: message.user,
                messages: [message.text],
                avatar: message.user === SelfUsername ? userAvatar : botAvatar
            });
        } else {
            result[result.length - 1].messages.push(message.text);
        }
        lastSender = message.user;
    });

    return result;
});