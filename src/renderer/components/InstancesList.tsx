import React, { Component } from "react";
import InstanceItem, { IInstanceItem } from "./InstanceItem";

export interface InstancesListProps {
    instances: IInstanceItem[];
    onSelect: (id: string) => void;
}

class InstancesList extends Component<InstancesListProps> {
    // Frontend component for showing if there are no instances
    noInstancesComponent = (
        <div id="instance-container" key="no-instances-comp">
            <div id="instance-line" className="unactive" />
            <div id="sidebar-no-instance-text-container">
                <p id="sidebar-no-instance-title">No instances</p>
            </div>
        </div>
    );

    formatInstance = ({
        label,
        modpack,
        active,
        instanceId,
    }: IInstanceItem): JSX.Element => {
        const { onSelect } = this.props;

        return (
            <InstanceItem
                key={instanceId}
                label={label}
                modpack={modpack}
                active={active}
                instanceId={instanceId}
                onSelect={onSelect}
            />
        );
    };

    formatInstances = (): JSX.Element[] => {
        const { instances } = this.props;

        if (instances.length === 0) return [this.noInstancesComponent];
        return instances.map((instance) => this.formatInstance(instance));
    };

    render(): JSX.Element {
        return <div id="instances-container">{this.formatInstances()}</div>;
    }
}

export default InstancesList;
