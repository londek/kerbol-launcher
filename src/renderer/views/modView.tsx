import React, { Component } from 'react';

export interface ModsViewProps {

}

export interface ModsViewState {

}

class ModsView extends Component<ModsViewProps, ModsViewState> {
    constructor(props: ModsViewProps) {
        super(props);
    }
    render(): JSX.Element {
        return ( <h4>Hello mods</h4> );
    }
}

export default ModsView;
