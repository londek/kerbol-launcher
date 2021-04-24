import '../css/sidebar.global.scss';

import React, { Component } from 'react';
import InstancesList from './InstancesList';
import { InstanceItemProps } from './InstanceItem';

interface SidebarProps {
    instances: { [key: string]: GameInstance }
    selectedInstance: string | null;
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

                <InstancesList instances={this.formatInstancesList()} />

                <button id="add-instance-btn" className="green-btn">
                    ADD INSTANCE
                </button>
            </div>
        );
    }

    formatInstancesList = (): InstanceItemProps[] => {
        if(Object.keys(this.props.instances).length === 0) return [];

        return Object.entries(this.props.instances).map(([key, { label }]): InstanceItemProps => (
            { label, instanceId: key, active: key === this.props.selectedInstance }
        ));
    }
}

export default Sidebar;
