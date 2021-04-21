import React, { Component, MouseEvent } from 'react';

class Quickstart extends Component {
    state = {
        path: ''
    }

    private onFormSubmit(event: MouseEvent<HTMLButtonElement>): void {
        console.log(event);
        return;
    }

    render(): JSX.Element {
        return (
            <div id="quickstart-overlay">
                <div id="quickstart-content">
                    <p id="quickstart-title" className="unselectable-text" data-align="middle">Quickstart</p>
                    <p id="quickstart-subtitle" className="unselectable-text" data-align="middle">Hey! We didn't detect any game instances - we suspect it's your first launch.<br/>Please point to buildID64.txt file in instance you want to add</p>
                    <div id="quickstart-path-div">
                        <input id="quickstart-path-input" placeholder="C:\Foo\Kerbal Space Program\buildID64.txt" data-align="middle" value={this.state.path}/>
                        <button id="quickstart-path-file-btn"><i className="fas fa-file-upload"></i></button>
                    </div>
                    <p id="quickstart-error" className="unselectable-text" data-align="middle">&nbsp;</p>
                    <button id="quickstart-ready-btn" className="unselectable-text" onClick={this.onFormSubmit}>READY</button>
                </div>
            </div>
        );
    }
}

export default Quickstart;
