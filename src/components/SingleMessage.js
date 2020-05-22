import React from 'react';
import styled from 'styled-components';
import { FadeInAnimation, BlinkReverese } from './Animations';
import { SelfUsername } from '../constants';

function SingleMessage({ text, user, location }) {
    const renderSelfMessage = () => {
        return (
            <SelfContainer>
                <SelfMessage location={location}>{text}</SelfMessage>
            </SelfContainer>
        );
    };

    const rednerBotMessage = () => {
        return (
            <BotContainer>
                <BotMessage location={location}>{text}</BotMessage>
            </BotContainer>
        );
    };

    if (user === SelfUsername) {
        return renderSelfMessage();
    }
    return rednerBotMessage();
}

const SelfContainer = styled.div`
    animation: ${FadeInAnimation} 1s;
    display: flex;
    flex-direction: row-reverse;
`;

const BotContainer = styled.div`
    animation: ${FadeInAnimation} 1s;
    display: flex;
    flex-direction: row;
`;

const MessageBase = styled.div`
    cursor: default;
    width: fit-content;
    margin-bottom: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 12px;

    &:hover {
        animation: ${BlinkReverese} .5s;
    }
`;

const SelfMessage = styled(MessageBase)`
    margin-right: 50px;
    color: white;
    background-color: #586e5d;
    border-radius: 20px;
`;

const BotMessage = styled(MessageBase)`    
    margin-left: 50px;
    color: black;
    background-color: #dedede;
    border-radius: ${(props) =>
        props.location === 'top' ? '20px 20px 20px 5px' : '5px 20px 20px 20px'};
`;

export default SingleMessage;
