import './css/app.global.scss';

import { HashRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';

import Sidebar from './components/Sidebar';
import HomeView from './views/homePage';
import ModsView from './views/modPage';
import OptionsView from './views/optionsPage';
import Navbar from './components/Navbar';

/*
            <div id="app-wrapper">
                <div id="sidebar">
                    <div id="title-label">
                        <label id="title-label-main" className="unselectable-text">Kerbol Launcher</label>
                        <label id="title-label-beta" className="unselectable-text">Beta</label>
                    </div>
                    <div id="instance-scroller-wrapper">
                        <div id="instance-scroller">
                            <div id="no-instances" style={{display: 'none'}}>
                                <div id="instance-item">
                                    <span className="instance-span unselectable-text">No instances yet</span>
                                </div>
                                <hr id="instance-separator" />
                            </div>
                        </div>
                    </div>
                    <div id="add-instance-btn-wrapper">
                        <button id="add-instance-btn" className='unselectable-text'>ADD INSTANCE</button>
                    </div>
                </div>
                <div id="right-pane">
                    <nav id="menubar">
                        <div>
                            <button className="active unselectable-text">Home</button>
                            <button className='unselectable-text'>Modpacks</button>
                            <button className='unselectable-text'>Launch params</button>
                        </div>
                    </nav>
                    <div id="page-contents"></div>
                </div>*/

interface State {
    instances: {[key: string]: GameInstance};
    defaultInstance: string | null;
}

class App extends Component<unknown, State> {
    state: State = {
        instances: {},
        defaultInstance: null
    }

    componentDidMount(): void {
        kerbolAPI.configManager.fetchGameInstances()
            .then(instances => this.setState({ instances }));

        kerbolAPI.configManager.fetchDefaultInstance()
            .then(defaultInstance => this.setState({ defaultInstance }));
    }

    render(): JSX.Element {
        return (
            <HashRouter>
                <Sidebar instances={this.state.instances} selectedInstance={this.state.defaultInstance} />
                <div id="right-pane">
                    <Navbar/>
                    <div id="contents">
                        <Switch>
                            <Route path="/" exact><HomeView /></Route>
                            <Route path="/mods"><ModsView /></Route>
                            <Route path="/options"><OptionsView /></Route>
                        </Switch>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default App;
