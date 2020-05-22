import { createSelector } from "reselect";

export const isBotTypingSelector = state => state.chat.isBotTyping;
export const canUserTypeSelector = createSelector(isBotTypingSelector, (isBotTypingSelector) => {
    return !isBotTypingSelector;
});