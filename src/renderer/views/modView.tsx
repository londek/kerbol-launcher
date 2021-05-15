/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { Component } from "react";

interface ModsViewProps {
    selectedInstance: GameInstance;
    instanceId: string;
}

interface ModsViewState {}

// eslint-disable-next-line react/prefer-stateless-function
class ModsView extends Component<ModsViewProps, ModsViewState> {
    constructor(props: ModsViewProps) {
        super(props);
    }
    render(): JSX.Element {
        return <h4>Mods are scheduled for mid-late May</h4>;
    }
}

export default ModsView;
