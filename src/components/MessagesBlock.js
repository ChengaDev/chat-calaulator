import React from 'react';
import styled from 'styled-components';
import SingleMessage from './SingleMessage';
import { Rotate } from './Animations';

function MessagesBlock({ messages, user, avatar }) {
    const isSingleMessage = messages.length === 1;
    return (
        <Container>
            <Avatar user={user} src={avatar} />
            <SingleMessage location='top' user={user} text={messages[0]} />
            {!isSingleMessage && (
                <SingleMessage
                    location='bottom'
                    user={user}
                    text={messages[1]}
                />
            )}
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
`;

const Avatar = styled.img`
    animation: ${Rotate} 1s;
    height: 30px;
    width: 30px;
    position: absolute;
    bottom: 5px;

    ${(props) => props.user === 'Me' && `right: 0;`}
`;

export default MessagesBlock;
