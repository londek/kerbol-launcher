import '../css/sidebar.global.scss'

import React, { Component } from 'react'
import InstancesList from './instancesList'
import { IInstanceItem } from './instanceItem'

interface SidebarProps {
    instances: { [key: string]: GameInstance }
    selectedInstance: string | null;
    onAddInstanceModal: () => void;
    onInstanceSelect: (id: string) => void;
}

class Sidebar extends Component<SidebarProps> {
    render(): JSX.Element {
        return (
            <div id="sidebar">
                <div id="title-container">
                    <p id="title-txt">
                        Kerbol Launcher
                    </p>

                    <p id="title-version" className="active">
                        LATEST 1.0 BETA
                    </p>
                </div>

                <InstancesList instances={this.formatInstancesList()}
                    onSelect={this.props.onInstanceSelect} />

                <button id="add-instance-btn" className="green-btn" onClick={this.props.onAddInstanceModal}>
                    ADD INSTANCE
                </button>
            </div>
        )
    }

    formatInstancesList = (): IInstanceItem[] => {
        if(Object.keys(this.props.instances).length === 0) return []

        return Object.entries(this.props.instances).map(([key, { label }]): IInstanceItem => (
            { label, instanceId: key, active: key === this.props.selectedInstance }
        ))
    }
}

export default Sidebar
