import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Switch,
    Route,
} from "react-router-dom";
import Auth from "../Auth";
import Log from "../Log/index";
import { signIn, signOut } from "../../requests/request";

import "./App.css";

function App() {
    const [authKey, setAuthKey] = useState<string>("");
    return (
        <Router basename='/log-in-build'>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        {authKey.length > 10 ? (
                            <Redirect to="/LogIn" />
                        ) : (
                            <Auth
                                signIn={signIn}
                                authKey={authKey}
                                setAuthKey={setAuthKey}
                            />
                        )}
                    </Route>
                    <Route path="/LogIn">
                        {authKey.length < 10 ? (
                            <Redirect to="/" />
                        ) : (
                            <Log
                                signOut={signOut}
                                setAuthKey={setAuthKey}
                                authKey={authKey}
                            />
                        )}
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
