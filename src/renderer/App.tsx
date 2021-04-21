import './css/app.global.scss';
import './css/quickstart.global.scss';
import './css/sidebar.global.scss';

import Quickstart from './components/Quickstart';

import React, { Component } from 'react';

class App extends Component<unknown, unknown> {
    constructor(props: unknown) {
        super(props);
        kerbolAPI.configManager.fetchGameInstances();
        this.state = {

        };
    }

    render(): JSX.Element {
        return (
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
                </div>
                <Quickstart />
            </div>
        );
    }
}

export default App;
