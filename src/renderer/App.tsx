import './css/app.global.scss';

import { HashRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';

import Sidebar from './components/sidebar';
import HomeView from './views/homeView';
import ModsView from './views/modView';
import OptionsView from './views/optionsView';
import Navbar from './components/navbar';
import AddInstanceModal from './views/addInstanceModal';

export enum AppModal {
    NONE,
    ADD_INSTANCE
}

interface AppState {
    instances: {[key: string]: GameInstance};
    defaultInstance: string;
    modal: AppModal;
}

class App extends Component<unknown, AppState> {
    state: AppState = {
        instances: {},
        defaultInstance: '',
        modal: AppModal.NONE
    }

    async componentDidMount(): Promise<void> {
        await this.fetchGameInstances();
    }

    async fetchGameInstances(): Promise<{[key: string]: GameInstance}> {
        const instances = await kerbolAPI.configManager.fetchGameInstances();
        this.setState({ instances });

        const defaultInstance = await kerbolAPI.configManager.fetchDefaultInstance();
        this.setState({ defaultInstance });
        return instances;
    }

    handleAddInstanceModal = (): void => {
        if(this.state.modal === AppModal.NONE) {
            return this.setState({ modal: AppModal.ADD_INSTANCE });
        }
        return this.setState({ modal: AppModal.NONE });
    }

    handleDeleteInstance = async (): Promise<void> => {
        const { error } = await kerbolAPI.configManager.deleteGameInstance(this.state.defaultInstance);
        if(error) return console.error('Error while deleting game instance', error);

        this.fetchGameInstances();
    }

    handleCloseRequest = async (): Promise<void> => {
        this.setState({ modal: AppModal.NONE });
        await this.fetchGameInstances();
    }

    handleInstanceSelect = (id: string): void => {
        kerbolAPI.configManager.updateDefaultInstance(id).then(() => {
            this.setState({ defaultInstance: id });
        });
    }

    render(): JSX.Element {
        let modal: JSX.Element | null = null;
        switch(this.state.modal) {
            case AppModal.ADD_INSTANCE:
                modal = <AddInstanceModal onCloseRequest={this.handleCloseRequest}/>;
                break;
        }

        if(Object.keys(this.state.instances).length === 0) modal = <AddInstanceModal onCloseRequest={this.handleCloseRequest} closeable={false} />;

        return ( modal ||
            <HashRouter>
                <Sidebar instances={this.state.instances}
                    selectedInstance={this.state.defaultInstance}
                    onAddInstanceModal={this.handleAddInstanceModal}
                    onInstanceSelect={this.handleInstanceSelect}
                />

                <div id="right-pane">
                    <Navbar/>
                    <div id="contents">
                        <Switch>
                            <Route path="/" exact>
                                <HomeView selectedInstance={this.state.instances[this.state.defaultInstance]} />
                            </Route>
                            <Route path="/mods">
                                <ModsView selectedInstance={this.state.instances[this.state.defaultInstance]} />
                            </Route>
                            <Route path="/options">
                                <OptionsView instanceId={this.state.defaultInstance}
                                    selectedInstance={this.state.instances[this.state.defaultInstance]}
                                    onDeleteInstance={this.handleDeleteInstance} />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default App;
