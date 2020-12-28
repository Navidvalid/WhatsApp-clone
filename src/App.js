import React from 'react';
import styled from 'styled-components';
import Chat from './Components/Chat';
import Sidebar from './Components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/Login';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <AppDiv>
      {!user ? (
        <Login />
      ) : (
        <AppBody>
          <Router>
            <Sidebar />
            <Switch>
              <Route path='/rooms/:roomId'>
                <Chat />
              </Route>

              <Route path='/'>
                <Chat />
              </Route>
            </Switch>
          </Router>
        </AppBody>
      )}
    </AppDiv>
  );
}

export default App;

const AppDiv = styled.div`
  display: grid;
  place-items: center;
  background-color: #dadbd3;
  height: 100vh;
`;

const AppBody = styled.div`
  display: flex;
  background-color: #ededed;
  margin-top: -50px;
  height: 90vh;
  width: 90vw;
  box-shadow: -1px 4px 20px -6px rgba(0, 0, 0, 0.2);
`;
