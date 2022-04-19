import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import MainTable from './components/MainTable.js';
import Logout from './components/Logout.js';
import DescriptionPage from "./components/DescriptionPage.js";
import { Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
export default class App extends Component {
    componentDidMount() {
        document.title = "Absence Manager";
    }

    render() {

        const titleStyle = {
            color: "white",
        };
        const linkStyle = {
            color: "grey",
        };

        return (
            <BrowserRouter>
                <>

                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand ><Link to="/" style={titleStyle}> Absence Manager </Link></Navbar.Brand>
                            <Nav className="me-auto">
                                <Nav.Link ><Link to="/absences" style={linkStyle}>Table </Link></Nav.Link>
                                <Nav.Link ><Link to="/logout" style={linkStyle}>Close</Link></Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>

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


