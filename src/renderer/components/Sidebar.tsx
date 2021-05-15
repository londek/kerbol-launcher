import "../css/sidebar.global.scss";

import React, { Component } from "react";
import InstancesList from "./InstancesList";
import { IInstanceItem } from "./InstanceItem";

interface SidebarProps {
    instances: { [key: string]: GameInstance };
    selectedInstance: string | null;
    onAddInstanceModal: () => void;
    onInstanceSelect: (id: string) => void;
}

class Sidebar extends Component<SidebarProps> {
    formatInstancesList = (): IInstanceItem[] => {
        const { instances, selectedInstance } = this.props;

        if (Object.keys(instances).length === 0) return [];

        return Object.entries(instances).map(
            ([key, { label }]): IInstanceItem => ({
                label,
                instanceId: key,
                active: key === selectedInstance,
            })
        );
    };

    render(): JSX.Element {
        const { onInstanceSelect, onAddInstanceModal } = this.props;

        return (
            <div id="sidebar">
                <div id="title-container">
                    <p id="title-txt">Kerbol Launcher</p>

                    <p id="title-version" className="active">
                        LATEST 1.0 BETA
                    </p>
                </div>

                <InstancesList
                    instances={this.formatInstancesList()}
                    onSelect={onInstanceSelect}
                />

                <button
                    type="button"
                    id="add-instance-btn"
                    className="green-btn"
                    onClick={onAddInstanceModal}
                >
                    ADD INSTANCE
                </button>
            </div>
        );
    }
}

export default Sidebar;
