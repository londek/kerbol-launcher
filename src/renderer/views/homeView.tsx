/* eslint-disable @typescript-eslint/no-empty-interface */
import "../css/homeview.global.scss";

import React, { Component } from "react";
import HomeViewFeed from "../components/HomeViewFeed";

interface HomeViewProps {
    selectedInstance: GameInstance;
    instanceId: string;
    steamNews: NewsData | null;
    onFeedRefresh: () => void;
}

interface HomeViewState {}

class HomeView extends Component<HomeViewProps, HomeViewState> {
    render(): JSX.Element {
        return (
            <React.Fragment>
                <HomeViewFeed
                    steamNews={this.props.steamNews}
                    onRefresh={this.props.onFeedRefresh}
                />
                <footer id="homeview__footer">
                    <button
                        id="homeview__footer-play-btn"
                        className="green-btn"
                        onClick={() =>
                            kerbolAPI.gameManager.runInstance(
                                this.props.instanceId
                            )
                        }
                    >
                        Play
                    </button>
                </footer>
            </React.Fragment>
        );
    }
}

export default HomeView;
