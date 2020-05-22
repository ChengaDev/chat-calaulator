import React from 'react';
import ChatScreen from './components/ChatScreen';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import styled from 'styled-components';

function App() {
    return (
        <Provider store={configureStore()}>
            <Container>
                <ChatScreen></ChatScreen>
            </Container>
        </Provider>
    );
}

const Container = styled.div`
    padding-top: 5%;
    display: flex;
    width: 100%;
`;

export default App;
