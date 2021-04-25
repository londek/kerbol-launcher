import '../css/homeview.global.scss';

import React, { Component } from 'react';

export interface HomeViewProps {

}

export interface HomeViewState {

}

class HomeView extends React.Component<HomeViewProps, HomeViewState> {
    constructor(props: HomeViewProps) {
        super(props);
    }
    render(): JSX.Element {
        return (
            <React.Fragment>
                <div id="homeview__feed-wrapper">

                </div>
                <footer id="homeview__footer">

                </footer>
            </React.Fragment>
        );
    }
}

export default HomeView;
