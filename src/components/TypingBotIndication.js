import React from 'react';
import styled from 'styled-components';
import { Blink, FadeInAnimation, SlideInFromLeft } from './Animations';
import botAvatar from '../images/mayas_avatar.png';

function TypingBotIndication({ withinBlock }) {
    return (
        <Container>
            <Avatar src={botAvatar} />
            <DotsBackground withinBlock={withinBlock} />
            <Dots>
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </Dots>
        </Container>
    );
}

const Container = styled.div`
    bottom: 70px;
    position: absolute;
    animation: ${SlideInFromLeft} 0.25s, ${FadeInAnimation} 1s;
    left: 30px;
    width: 100%;
    display: flex;
    flex-direction: row;
`;

const Avatar = styled.img`
    animation: ${FadeInAnimation} 1s;
    height: 30px;
    width: 30px;
`;

const Dots = styled.div`    
    position: absolute;
    bottom: 8px;
    left: 58px;
    width: 100px;

    & span {
        height: 30px;
        line-height: 30px;
        font-size: 50px;
        animation-name: ${Blink};
        animation-duration: 1s;
        animation-iteration-count: infinite;

        &:nth-child(2) {
            animation-delay: 0.2s;
        }

        &:nth-child(3) {
            animation-delay: 0.4s;
        }
    }
`;

const DotsBackground = styled.div`
    background-color: #f2f2f2;
    position: absolute;
    height: 30px;
    width: 50px;
    border-radius: 20px;
    left: 50px;
`;

export default React.memo(TypingBotIndication);
