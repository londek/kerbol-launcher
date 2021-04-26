// @ts-expect-error: It has no typings ;/
import parser from 'bbcode-to-react';
import React, { Component } from 'react';

interface HomeViewFeedState {
    newsData: unknown | null;
}

class HomeViewFeed extends Component<unknown, HomeViewFeedState> {
    state = {
        newsData: null
    }

    componentDidMount(): void {
        fetch('http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=220200&count=1&format=json')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ newsData: result.appnews.newsitems[0] });
                    console.log('Downloaded KSP news from Steam', this.state.newsData);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    render(): JSX.Element {
        return (
            <div id="homeview__feed-wrapper">
                {this.formatFeed()}
            </div>
        );
    }

    private formatFeed(): JSX.Element {
        if(this.state.newsData === null) return (<h4 id="homeview__feed-loading">Loading</h4>);

        // @ts-expect-error: Typescript wrongly assumes its null
        const { title, date, contents, tags } = this.state.newsData;

        const formattedDateString = new Date(date * 1000).toDateString();

        return (
            <div id="homeview__feed-container">
                <label id="homeview__feed-title">{title}</label>
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
