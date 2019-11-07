import React, { Component } from 'react'
import navData from '../staticNavData.js'
import {Link} from 'react-router-dom'

export default class NavBar extends Component {
    state = {
        navData: navData
    }
    render() {
        const NavDataElements = this.state.navData.map((nav) => {
           return ( <Link to={`/${nav.name}`}>{nav.name}</Link> )
        })
        return (
            <div>
                {NavDataElements}
            </div>
        )
    }
}
