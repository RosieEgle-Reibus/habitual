import React, { Component } from 'react'
import axios from 'axios'

export default class SingleReward extends Component {
    render() {
        const {
            rewardId,
            reward,
            level,
            onRewardDeleteClick,
            refreshRewardComponent
        } = this.props
        return (
            <div key={rewardId}>
                <h1>{reward}</h1>
                <h2>{level}</h2>
                <button onClick={()=> onRewardDeleteClick(rewardId)}>Delete Reward</button>
            </div>
        )
    }
}
