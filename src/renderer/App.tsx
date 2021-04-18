import './css/app.global.scss';
import './css/quickstart.global.scss';
import './css/sidebar.global.scss';
import React from 'react';

export default function App(): JSX.Element {
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
            <div id="quickstart-overlay">
                <div id="quickstart-content">
                    <p id="quickstart-title" className="unselectable-text" data-align="middle">Quickstart</p>
                    <p id="quickstart-subtitle" className="unselectable-text" data-align="middle">Hey! We didn't detect any game instances - we suspect it's your first launch.<br/>Please point to buildID64.txt file in instance you want to add</p>
                    <div id="quickstart-path-div">
                        <input id="quickstart-path-input" placeholder="C:\Foo\Kerbal Space Program\buildID64.txt" data-align="middle"/>
                        <button id="quickstart-path-file-btn"><i className="fas fa-file-upload"></i></button>
                    </div>
                    <p id="quickstart-error" className="unselectable-text" data-align="middle">&nbsp;</p>
                    <button id="quickstart-ready-btn" className="unselectable-text">READY</button>
                </div>
            </div>
        </div>
    );
}
