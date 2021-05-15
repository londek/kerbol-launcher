// @ts-expect-error: It has no typings
import bbcode from "bbcode-to-react";
import React, { Component, MouseEvent } from "react";
import { FaSync } from "react-icons/fa";

interface HomeViewFeedProps {
    steamNews: NewsData | null;
    onRefresh: () => void;
}

class HomeViewFeed extends Component<HomeViewFeedProps> {
    handleOnClick = async (): Promise<void> => {
        const { steamNews } = this.props;

        if (steamNews) await kerbolAPI.utilitiesManager.openURL(steamNews.url);
    };

    handleOnRefreshClick = async (e: MouseEvent): Promise<void> => {
        const { onRefresh } = this.props;

        e.stopPropagation();
        onRefresh();
    };

    formatFeed = (): JSX.Element => {
        const { steamNews } = this.props;

        if (!steamNews) {
            return <h4 id="homeview__feed-loading" />;
        }

        const { title, date, contents, tags } = steamNews;

        const formattedDateString = new Date(date * 1000).toDateString();

        const rowContainerStyle = { display: "inline-flex" };

        return (
            <div id="homeview__feed-container">
                <div style={rowContainerStyle}>
                    <span
                        id="homeview__feed-title"
                        onClick={this.handleOnClick}
                    >
                        {title}
                    </span>
                    <FaSync
                        id="homeview__feed-refresh"
                        onClick={this.handleOnRefreshClick}
                    />
                </div>
                <div style={rowContainerStyle}>
                    <span id="homeview__feed-footer">
                        {formattedDateString}
                    </span>
                </div>
                <div style={rowContainerStyle}>
                    <span id="homeview__feed-tags">
                        {tags ? tags.join(" ") : "No tags"}
                    </span>
                </div>

                <div id="homeview__feed-horizontal-line" />

                <div id="homeview__feed-scroller-wrapper">
                    <div id="homeview__feed-scroller">
                        {bbcode.toReact(contents)}
                    </div>
                </div>
            </div>
        );
    };

    render(): JSX.Element {
        return <div id="homeview__feed-wrapper">{this.formatFeed()}</div>;
    }
}

export default HomeViewFeed;
