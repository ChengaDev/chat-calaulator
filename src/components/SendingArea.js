import React, { useRef, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import submitIcon from '../images/submit_icon.png';
import { FadeInAnimation, BlinkReverese, SlideInFromRight } from './Animations';
import { EnterKeyCode } from '../constants';

function SendingArea({ onSubmit, canUserType }) {
    const inputRef = useRef();
    const [hasInputError, setHasInputError] = useState(false);

    const onSubmitClicked = useCallback(() => {
        const submittedValue = inputRef.current.value;
        // empty input validation
        if (!submittedValue || submittedValue.length === 0) {
            // mark the input with red outline
            return setHasInputError(true);
        }
        onSubmit(inputRef.current.value);
        clearInput();
    }, [onSubmit]);

    useEffect(() => {
        // enable submission on enter click
        const handleEnterKeyPress = (event) => {
            // clear red outline of exists
            setHasInputError(false);
            const { keyCode } = event;
            if (keyCode === EnterKeyCode) {
                onSubmitClicked();
            }
        };

        inputRef.current.addEventListener('keypress', handleEnterKeyPress);
        inputRef.current.focus();

        // cleanup
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            inputRef.current.removeEventListener('keypress', handleEnterKeyPress);
        }
    }, [onSubmitClicked]);

    const clearInput = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    return (
        <Container>
            <InputWrapper>
                <MessageInput hasError={hasInputError} disabled={!canUserType} ref={inputRef} />
            </InputWrapper>
            <SubmitButton onClick={onSubmitClicked}>
                <SubmitIcon src={submitIcon} />
            </SubmitButton>
        </Container>
    );
}

const Container = styled.div`
    animation: ${SlideInFromRight} 0.25s, ${FadeInAnimation} 2s;
    bottom: 0;
    position: absolute;
    width: 100%;
    background-color: #f5f5f5;
    height: 60px;
    border-top: 1px solid #e6e6e6;
    flex-direction: row;
    display: flex;
`;

const InputWrapper = styled.div`
    margin-top: 10px;
    padding-left: 20px;
    width: calc(100% - 80px);
`;

const MessageInput = styled.input`
    width: 100%;
    display: inline-block;
    height: 35px;
    border-radius: 5px;
    border: ${props => props.hasError ? '2px solid #d95293' : '1px solid #bab9b6'};
    text-indent: 10px;
    font-size: 20px;
    outline: none;
`;

const SubmitIcon = styled.img`
    cursor: pointer;
    width: 22px;
    margin-top: 2px;

    &:hover {
        animation: ${BlinkReverese} 0.75s;
    }
`;

const SubmitButton = styled.div`
    display: inline-block;
    width: 10%;
    text-align: center;
    margin-top: 17px;
    padding-left: 20px;
    padding-right: 20px;
`;

export default React.memo(SendingArea);
