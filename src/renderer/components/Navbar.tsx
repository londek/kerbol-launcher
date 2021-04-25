import '../css/navbar.global.scss';

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
    render(): JSX.Element {
        return (
            <nav id="navbar">
                <NavLink exact to="/" id="navbar-tab-container">
                    <label id="navbar-tab-text">HOME</label>
                    <div id="navbar-tab-line" />
                </NavLink>

                <NavLink to="/mods" id="navbar-tab-container">
                    <label id="navbar-tab-text">MODS</label>
                    <div id="navbar-tab-line" />
                </NavLink>

                <NavLink to="/options" id="navbar-tab-container">
                    <label id="navbar-tab-text">OPTIONS</label>
                    <div id="navbar-tab-line" />
                </NavLink>
            </nav>
        );
    }
}

export default Navbar;
