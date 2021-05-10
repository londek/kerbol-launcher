// @ts-expect-error: It has no typings ;/
import parser from 'bbcode-to-react';
import React, { Component, MouseEvent } from 'react';
import { FaSync } from 'react-icons/fa';

interface HomeViewFeedProps {
    steamNews: NewsData | null;
    onRefresh: () => void;
}

class HomeViewFeed extends Component<HomeViewFeedProps> {
    render(): JSX.Element {
        return (
            <div id="homeview__feed-wrapper">
                {this.formatFeed()}
            </div>
        );
    }

    handleOnClick = (e: MouseEvent): void => {
        e.preventDefault();
        e.stopPropagation();
        window.open(this.props.steamNews?.url);
    }

    handleOnRefreshClick = (e: MouseEvent): void => {
        e.preventDefault();
        e.stopPropagation();
        this.props.onRefresh();
    }

    formatFeed = (): JSX.Element => {
        if(!this.props.steamNews) {
            return <h4 id="homeview__feed-loading"></h4>;
        }

        const { title, date, contents, tags } = this.props.steamNews;

        const formattedDateString = new Date(date * 1000).toDateString();

        return (
            <div id="homeview__feed-container">
                <label id="homeview__feed-title" onClick={this.handleOnClick}>{title}    <FaSync id="homeview__feed-refresh" onClick={this.handleOnRefreshClick} /></label>
                <label id="homeview__feed-footer">{formattedDateString}</label>
                <label id="homeview__feed-tags">{tags.join(' ')}</label>

                <div id="homeview__feed-horizontal-line" />

                <div id="homeview__feed-scroller-wrapper">
                    <div id="homeview__feed-scroller">
                        {parser.toReact(contents)}
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeViewFeed;
