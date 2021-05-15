import React, { FunctionComponent } from "react";

export interface IInstanceItem {
    label: string;
    modpack?: string;
    active: boolean;
    instanceId: string;
}

interface InstanceItemProps extends IInstanceItem {
    onSelect: (id: string) => void;
}

const InstanceItem: FunctionComponent<InstanceItemProps> = ({
    onSelect,
    instanceId,
    active,
    label,
    modpack,
}) => {
    return (
        <div id="instance-container" onClick={() => onSelect(instanceId)}>
            <div id="instance-line" className={active ? "active" : undefined} />
            <div id="sidebar-instance-text-container">
                <label id="sidebar-instance-title">{label}</label>
                <br />
                <label id="sidebar-instance-modpack">
                    Modpack: {modpack || "None"}
                </label>
            </div>
        </div>
    );
};

export default InstanceItem;
