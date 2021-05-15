/* eslint-disable @typescript-eslint/no-empty-interface */
import "../css/optionsview.global.scss";

import React, { Component } from "react";

interface OptionsViewProps {
    selectedInstance: GameInstance;
    instanceId: string;
    onDeleteInstance: () => void;
}

interface OptionsViewState {}

class OptionsView extends Component<OptionsViewProps, OptionsViewState> {
    constructor(props: OptionsViewProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <div id="optionsview__container">
                <input />
                <button
                    id="optionsview__remove-instance-btn"
                    className="red-btn"
                    onClick={this.props.onDeleteInstance}
                >
                    REMOVE
                </button>
            </div>
        );
    }
}

export default OptionsView;
