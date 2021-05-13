import '../css/debugview.global.scss'

import React, { Component } from 'react'

class DebugView extends Component {
    render(): JSX.Element {
        return (
            <div id="dev__container">
                <div id="dev__color1" className="dev__colorBox"></div>
                <div id="dev__color2" className="dev__colorBox"></div>
                <div id="dev__color3" className="dev__colorBox"></div>
                <div id="dev__color4" className="dev__colorBox"></div>
                <div id="dev__color5" className="dev__colorBox"></div>
                <div id="dev__color6" className="dev__colorBox"></div>
                <div id="dev__color7" className="dev__colorBox"></div>
                <div id="dev__color8" className="dev__colorBox"></div>
                <div id="dev__color9" className="dev__colorBox"></div>
                <div id="dev__accentLight" className="dev__colorBox"></div>
                <div id="dev__accent" className="dev__colorBox"></div>
                <div id="dev__accentDark" className="dev__colorBox"></div>
            </div>
        )
    }
}

export default DebugView
