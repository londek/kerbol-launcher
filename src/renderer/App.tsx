import './css/app.global.scss';

import { Redirect, Route, Router, Switch } from 'react-router-dom';
import React, { Component } from 'react';

import Sidebar from './components/sidebar';
import HomeView from './views/homeView';
import ModsView from './views/modView';
import OptionsView from './views/optionsView';
import Navbar from './components/navbar';
import AddInstanceModal from './views/addInstanceView';
import { createHashHistory, History } from 'history';

interface AppState {
    instances: {[key: string]: GameInstance};
    defaultInstance: string;
    history: History;
}

class App extends Component<unknown, AppState> {
    state: AppState = {
        instances: kerbolAPI.configManager.fetchInitialGameInstances(),
        defaultInstance: kerbolAPI.configManager.fetchInitialDefaultInstance(),
        history: createHashHistory()
    }

    fetchGameInstances = async (): Promise<KeyedGameInstances> => {
        const instances = await kerbolAPI.configManager.fetchGameInstances();
        this.setState({ instances });

        const defaultInstance = await kerbolAPI.configManager.fetchDefaultInstance();
        this.setState({ defaultInstance });
        return instances;
    }

    handleDeleteInstance = async (): Promise<void> => {
        const { error } = await kerbolAPI.configManager.deleteGameInstance(this.state.defaultInstance);
        if(error) return console.error('Error while deleting game instance', error);

        this.fetchGameInstances();
    }

    handleCloseRequest = async (): Promise<void> => {
        await this.fetchGameInstances();
    }

    handleInstanceSelect = (id: string): void => {
        kerbolAPI.configManager.updateDefaultInstance(id).then(() => {
            this.setState({ defaultInstance: id });
        });
    }

    render(): JSX.Element {
        const selectedInstance = this.state.instances[this.state.defaultInstance];

        if(Object.keys(this.state.instances).length === 0) this.state.history.replace('/addInstanceSplash');

        return (
            <Router history={this.state.history}>
                <Sidebar instances={this.state.instances}
                    selectedInstance={this.state.defaultInstance}
                    onAddInstanceModal={() => this.state.history.push('/addInstance')}
                    onInstanceSelect={this.handleInstanceSelect} />

                <div id="right-pane">
                    <Navbar/>
                    <div id="contents">
                        <Switch>
                            <Route exact path="/">
                                <HomeView selectedInstance={selectedInstance} />
                            </Route>

                            <Route path="/mods">
                                <ModsView selectedInstance={selectedInstance} />
                            </Route>

                            <Route path="/options">
                                <OptionsView instanceId={this.state.defaultInstance}
                                    selectedInstance={this.state.instances[this.state.defaultInstance]}
                                    onDeleteInstance={this.handleDeleteInstance} />
                            </Route>

                            <Route path="/addInstance" render={
                                props => <AddInstanceModal {...props} onWillClose={this.fetchGameInstances} />
                            } />
                            <Route path="/addInstanceSplash" render={
                                props => <AddInstanceModal {...props} onWillClose={this.fetchGameInstances} closeable={false} />
                            } />

                            <Redirect to="/addInstanceSplash" />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
