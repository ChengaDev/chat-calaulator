import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SendingArea from './SendingArea';
import MessagesBlock from './MessagesBlock';
import TypingBotIndication from './TypingBotIndication';
import { isBotTypingSelector, canUserTypeSelector } from '../state/chat/selectors';
import { messagesBlocksSelector } from '../state/messages/selectors';
import { startChat } from '../state/chat/thunks';
import { publishUserMessage } from '../state/messages/thunks';

function ChatScreen(initialUsername) {
    const messagesContainer = useRef();

    const dispatch = useDispatch();
    const isBotTyping = useSelector(isBotTypingSelector);
    const canUserType = useSelector(canUserTypeSelector);
    const messagesBlocks = useSelector(messagesBlocksSelector);

    useEffect(() => {
        dispatch(startChat());
    }, [dispatch]);

    useEffect(() => {
        messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
    }, [messagesBlocks, isBotTyping]);

    const onTextSubmission = (text) => {
        dispatch(publishUserMessage({ user: "Me", text: text }))
    };

    return (
        <Container>
            <CharWrapper isBotTyping={isBotTyping} ref={messagesContainer} >
                <ChatArea isBotTyping={isBotTyping} canUserType={canUserType}>
                    {messagesBlocks && messagesBlocks.map((messageBlock, index) => {
                        return <MessagesBlock
                            key={index}
                            user={messageBlock.user}
                            messages={messageBlock.messages}
                            avatar={messageBlock.avatar}
                        />
                    })}
                </ChatArea>
                {isBotTyping && <TypingBotIndication />}
            </CharWrapper>
            <SendingArea canUserType={canUserType} onSubmit={onTextSubmission} />
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    min-width: 350px;
    width: 30%;
    min-height: 500px;
    margin: 0 auto;
    background-color: white;
    box-shadow: 2px 1px 16px 1px #bab9b6;
`;

const ChatArea = styled.div`
    margin-top: 10px;
    min-height: ${props => props.isBotTyping ? '390px' : '430px'};
    padding-bottom: ${props => props.isBotTyping ? '40px' : '0'};
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-right: 30px;
    padding-left: 30px;
`;

const CharWrapper = styled.div`
    overflow-y: auto; 
    height: 440px;
`;

export default ChatScreen;
