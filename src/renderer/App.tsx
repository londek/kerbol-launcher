import "./css/app.global.scss";

import { Redirect, Route, Router, Switch } from "react-router-dom";
import React, { Component } from "react";

import Sidebar from "./components/Sidebar";
import HomeView from "./views/HomeView";
import ModsView from "./views/ModView";
import OptionsView from "./views/OptionsView";
import Navbar from "./components/Navbar";
import AddInstanceModal from "./views/AddInstanceView";
import { createHashHistory, History } from "history";
import DebugView from "./views/DebugView";

interface AppState {
    instances: KeyedGameInstances;
    defaultInstance: string;
    history: History;
    steamNews: NewsData | null;
}

class App extends Component<unknown, AppState> {
    state: AppState = {
        instances: kerbolAPI.configManager.fetchInitialGameInstances(),
        defaultInstance: kerbolAPI.configManager.fetchInitialDefaultInstance(),
        history: createHashHistory(),
        steamNews: null,
    };

    componentDidMount = async (): Promise<void> => {
        await this.fetchSteamNews();
    };

    fetchSteamNews = async (): Promise<void> => {
        const result = await fetch(
            "https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=220200&count=25&format=json"
        );
        const newsData = await result.json();

        for (const steamNews of newsData.appnews.newsitems) {
            if (steamNews.feed_type === 1) {
                this.setState({ steamNews });
                console.log("Downloaded KSP news from Steam", steamNews);
                return;
            }
        }

        console.error("Couldnt find news with feed_type === 1");
    };

    fetchGameInstances = async (): Promise<KeyedGameInstances> => {
        const instances = await kerbolAPI.configManager.fetchGameInstances();
        this.setState({ instances });

        const defaultInstance =
            await kerbolAPI.configManager.fetchDefaultInstance();
        this.setState({ defaultInstance });
        return instances;
    };

    handleDeleteInstance = async (): Promise<void> => {
        const { error } = await kerbolAPI.configManager.deleteGameInstance(
            this.state.defaultInstance
        );
        if (error)
            return console.error("Error while deleting game instance", error);

        this.fetchGameInstances();
    };

    handleCloseRequest = async (): Promise<void> => {
        await this.fetchGameInstances();
    };

    handleInstanceSelect = (id: string): void => {
        kerbolAPI.configManager.updateDefaultInstance(id).then(() => {
            this.setState({ defaultInstance: id });
        });
    };

    render(): JSX.Element {
        const selectedInstance =
            this.state.instances[this.state.defaultInstance];

        if (Object.keys(this.state.instances).length === 0)
            this.state.history.replace("/addInstanceSplash");

        return (
            <Router history={this.state.history}>
                <Sidebar
                    instances={this.state.instances}
                    selectedInstance={this.state.defaultInstance}
                    onAddInstanceModal={() =>
                        this.state.history.push("/addInstance")
                    }
                    onInstanceSelect={this.handleInstanceSelect}
                />

                <div id="right-pane">
                    <Navbar />
                    <div id="contents">
                        <Switch>
                            <Route exact path="/">
                                <HomeView
                                    selectedInstance={selectedInstance}
                                    instanceId={this.state.defaultInstance}
                                    steamNews={this.state.steamNews}
                                    onFeedRefresh={this.fetchSteamNews}
                                />
                            </Route>

                            <Route path="/mods">
                                <ModsView
                                    selectedInstance={selectedInstance}
                                    instanceId={this.state.defaultInstance}
                                />
                            </Route>

                            <Route path="/options">
                                <OptionsView
                                    selectedInstance={
                                        this.state.instances[
                                            this.state.defaultInstance
                                        ]
                                    }
                                    instanceId={this.state.defaultInstance}
                                    onDeleteInstance={this.handleDeleteInstance}
                                />
                            </Route>

                            <Route path="/debug">
                                <DebugView />
                            </Route>

                            <Route
                                path="/addInstance"
                                render={(props) => (
                                    <AddInstanceModal
                                        {...props}
                                        onWillClose={this.fetchGameInstances}
                                    />
                                )}
                            />
                            <Route
                                path="/addInstanceSplash"
                                render={(props) => (
                                    <AddInstanceModal
                                        {...props}
                                        onWillClose={this.fetchGameInstances}
                                        closeable={false}
                                    />
                                )}
                            />

                            <Redirect to="/addInstanceSplash" />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
