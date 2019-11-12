import React, { Component } from 'react'
import congratulationsData from '../staticCongratulationsData.jsx'

export default class Congratulations extends Component {
    state = {
        congratsData = congratulationsData
    }

    render() {
        const CongratsDataElement = this.state.congratsData.map((congrats) => {
            
        })

        return (
            <div>
                
            </div>
        )
    }
}
