import React, { Component } from 'react';

export interface InstanceItemProps {
    label: string;
    modpack?: string;
    active: boolean;
    instanceId: string;
}

class InstanceItem extends Component<InstanceItemProps> {
    render(): JSX.Element {
        return (
            <div id="instance-container">
                <div id="instance-line" className={this.props.active ? 'active' : undefined} />
                <div id="sidebar-instance-text-container">
                    <label id="sidebar-instance-title">{this.props.label}</label><br />
                    <label id="sidebar-instance-modpack">Modpack: {this.props.modpack || 'None'}</label>
                </div>
            </div>
        );
    }
}

export default InstanceItem;
