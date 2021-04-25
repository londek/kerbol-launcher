import React, { Component } from 'react';

export interface OptionsViewProps {

}

export interface OptionsViewState {

}

class OptionsView extends Component<OptionsViewProps, OptionsViewState> {
    constructor(props: OptionsViewProps) {
        super(props);
    }
    render(): JSX.Element {
        return ( <h4>OptionsPage Hello world</h4> );
    }
}

export default OptionsView;
