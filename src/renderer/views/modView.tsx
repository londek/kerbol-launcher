import React, { Component } from 'react';

interface ModsViewProps {

}

interface ModsViewState {

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
