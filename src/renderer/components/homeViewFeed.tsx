// @ts-expect-error: It has no typings ;/
import parser from 'bbcode-to-react';
import React, { Component } from 'react';

interface INewsData {
    title: string;
    tags: string[];
    date: number;
    contents: string;
    url: string;
    [key: string]: unknown;
}

interface HomeViewFeedState {
    newsData: INewsData | null;
}

class HomeViewFeed extends Component<unknown, HomeViewFeedState> {
    state: HomeViewFeedState = {
        newsData: null
    }

    componentDidMount(): void {
        fetch('http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=220200&count=1&format=json')
            .then(result => result.json())
            .then(
                result => {
                    const newsData = result.appnews.newsitems[0];
                    this.setState({ newsData });
                    console.log('Downloaded KSP news from Steam', newsData);
                }
            ).catch(error => console.log(error));
    }

    render(): JSX.Element {
        return (
            <div id="homeview__feed-wrapper">
                {this.formatFeed()}
            </div>
        );
    }

    handleOnClick = (): void => {
        window.open(this.state.newsData?.url);
    }

    formatFeed = (): JSX.Element => {
        if(!this.state.newsData) {
            return <h4 id="homeview__feed-loading"></h4>;
        }

        const { title, date, contents, tags } = this.state.newsData;

        const formattedDateString = new Date(date * 1000).toDateString();

        return (
            <div id="homeview__feed-container">
                <label id="homeview__feed-title" onClick={this.handleOnClick}>{title}</label>
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
