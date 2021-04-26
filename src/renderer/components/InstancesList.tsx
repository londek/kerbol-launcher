import React, { Component } from 'react';
import InstanceItem, { InstanceItemProps } from './InstanceItem';

export interface InstancesListProps {
    instances: InstanceItemProps[]
}

class InstancesList extends Component<InstancesListProps> {
    // Frontend component for showing if there are no instances
    private noInstancesComponent = (
            <div id="instance-container">
                <div id="instance-line" className='unactive' />
                <div id="sidebar-no-instance-text-container">
                    <p id="sidebar-no-instance-title">No instances</p>
                </div>
            </div>
    );

    render(): JSX.Element {
        return (
            <div id="instances-container">
                {this.formatInstances()}
            </div>
        );
    }

    private formatInstances = (): JSX.Element[] => {
        const { instances } = this.props;

        if(instances.length === 0) return [ this.noInstancesComponent ];
        return instances.map(instance => this.formatInstance(instance));
    };

    private formatInstance = ({label, modpack, active, instanceId}: InstanceItemProps): JSX.Element => {
        return <InstanceItem
            key={instanceId}
            label={label}
            modpack={modpack}
            active={active}
            instanceId={instanceId}
        />;
    };
}

export default InstancesList;
