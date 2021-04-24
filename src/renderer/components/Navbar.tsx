import '../css/navbar.global.scss';

import React, { Component } from 'react';

class Navbar extends Component {
    render(): JSX.Element {
        return (
            <nav id="navbar">
                <div id="navbar-tab-container">
                    <label id="navbar-tab-text">HOME</label>
                    <div id="navbar-tab-line" className="active" />
                </div>
                <div id="navbar-tab-container">
                    <label id="navbar-tab-text">MODS</label>
                    <div id="navbar-tab-line" />
                </div>
                <div id="navbar-tab-container">
                    <label id="navbar-tab-text">OPTIONS</label>
                    <div id="navbar-tab-line" />
                </div>
            </nav>
        );
    }
}

export default Navbar;
