import React, { Component } from 'react';

interface OptionsViewProps {
    selectedInstance: GameInstance;
    instanceId: string;
    onDeleteInstance: () => void;
}

interface OptionsViewState {

}

class OptionsView extends Component<OptionsViewProps, OptionsViewState> {
    constructor(props: OptionsViewProps) {
        super(props);
    }

    render(): JSX.Element {
        return ( <h4 onClick={this.props.onDeleteInstance}>OptionsPage Hello world</h4> );
    }
}

export default OptionsView;
