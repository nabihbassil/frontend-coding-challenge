import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import MainTable from './components/MainTable.js';
import Logout from './components/Logout.js';
import DescriptionPage from "./components/DescriptionPage.js";
import './App.css'
import exitLogo from "./imgs/logout.png"
import tableLogo from "./imgs/sheet.png"

export default class App extends Component {
    componentDidMount() {
        document.title = "Absence Manager";
    }

    render() {

        const mystyle = {
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "6em"
          };

        return (
            <BrowserRouter>
                <>
                <div id="wrapper" style={mystyle}>
                    <div>
                        <Link to="/absences">
                        <img src={tableLogo} alt={"exitLogo"} />
                        </Link>
                    </div>
                    <div>
                    <Link to="/">
                    <h1 id="title">Absence Manager</h1>
                        </Link>
                        
                    </div>
                    <div>
                    <Link to="/logout">
                    <img src={exitLogo} alt={"exitLogo"} />
                        </Link>
                    </div>
                    </div>

                </>
                <Switch>
                    <Route path="/" exact component={DescriptionPage} />
                    <Route path="/absences" exact component={MainTable} />
                    <Route path="/logout" exact component={Logout} />
                </Switch>
            </BrowserRouter>
        )
    }
}


