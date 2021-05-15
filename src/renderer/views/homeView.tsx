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

// eslint-disable-next-line react/prefer-stateless-function
class HomeView extends Component<HomeViewProps, HomeViewState> {
    render(): JSX.Element {
        const { instanceId, steamNews, onFeedRefresh } = this.props;

        return (
            <>
                <HomeViewFeed steamNews={steamNews} onRefresh={onFeedRefresh} />
                <footer id="homeview__footer">
                    <button
                        type="button"
                        id="homeview__footer-play-btn"
                        className="green-btn"
                        onClick={() =>
                            kerbolAPI.gameManager.runInstance(instanceId)
                        }
                    >
                        Play
                    </button>
                </footer>
            </>
        );
    }
}

export default HomeView;
