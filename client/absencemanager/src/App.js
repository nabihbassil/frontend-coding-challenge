import React, {Component} from "react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import MainTable from './components/MainTable';
import Logout from './components/Logout';

export default class App extends Component{
  render(){
    return (
        <BrowserRouter>
            <>
                <h1>Absence Manager</h1>
              
                <div>
                    <Link to={"/absences"}>
                        Check Absences
                    </Link>
                </div>
                <div>
                    <Link to={"/logout"}>
                        Close
                    </Link>
                </div>
            </>
            <Switch>
                <Route path={"/absences"} exact component={MainTable} />
                <Route path={"/logout"} exact component={Logout} />
            </Switch>
        </BrowserRouter>
    )
}
}
