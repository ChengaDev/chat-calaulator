import { PUSH_MESSAGE } from './types';

export const pushMessage = (message) => ({
    type: PUSH_MESSAGE,
    message
});