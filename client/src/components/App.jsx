import React from 'react'
import {BrowserRouter, Switch,Route} from 'react-router-dom';
import Login from './Login';
import Chat from './Chat';
import { v4 as uuidv4 } from 'uuid';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/chat" render={(props) => <Chat {...props} key={uuidv4()}/>} />

            </Switch>
        </BrowserRouter>
    )
}

export default App
