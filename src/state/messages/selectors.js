import { createSelector } from 'reselect';
import botAvatar from '../../images/mayas_avatar.png';
import userAvatar from '../../images/user_avatar.png';
import { SelfUsername } from '../../constants';

export const messagesSelector = (state) => state.messages;

/**
 * This selector is responsible for modelize the message for message-blocks for display
 * a block is actually a bunch of messages which sent in a row from the same sender
 */
export const messagesBlocksSelector = createSelector(messagesSelector, (messages) => {
    if (!messages || messages.length === 0) return null;

    let result = [];
    // keep the last sender name in order to create a message block when the sender changes
    let lastSender = '';
    messages.forEach(message => {
        if (lastSender !== message.user) {
            // if the sender has changed from the last message - create new message block
            result.push({
                user: message.user,
                messages: [message.text],
                avatar: message.user === SelfUsername ? userAvatar : botAvatar
            });
        } else {
            // if this is the same sender - aggregate the message in the last block's messages
            result[result.length - 1].messages.push(message.text);
        }
        // track the sender
        lastSender = message.user;
    });

    return result;
});