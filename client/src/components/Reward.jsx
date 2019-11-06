import React, { Component } from 'react'
import axios from 'axios'
import SingleReward from './SingleReward.jsx'

export default class Reward extends Component {
    state = {
        rewardList: [],
        reward: '',
        level: ''
    }
    componentDidMount() {
        axios.get('/api/reward')
            .then((res) => {
                this.setState({ rewardList: res.data })
            })
    }
    refreshRewardComponent = () => {
        axios.get('/api/reward')
            .then((res) => {
                this.setState({ rewardList: res.data })
            })
    }
   
    createNewReward = (event) => {
        event.preventDefault()
        axios.post('/api/reward', this.state)
        .then(() => {
            this.refreshRewardComponent()
        })
    }

    onCreateReward = (event) => {
        const previousState = {...this.state}
        const newReward = event.target.value
        previousState.reward = newReward
        this.setState(previousState)
    }

    onCreateLevel = (event) => {
        const previousState = {...this.state}
        const newLevel = event.target.value
        previousState.level = newLevel
        this.setState(previousState)
    }



    render() {
        const RewardListElements = this.state.rewardList.map((reward) => {
            return (
                <div>
                    <SingleReward
                        rewardId={reward._id}
                        reward={reward.reward}
                        level={reward.level} />
                </div>
            )
        })
        return (
            <div>
                <h2>REWAAAAAARRRD Yo' Self</h2>
                <form onSubmit={this.createNewReward}>
                    <label for="reward">Add a new way to reward yourself
                    </label>
                    <input
                        type="string"
                        placeholder="New Reward"
                        id="reward"
                        value={this.state.reward} 
                        onChange={this.onCreateReward}/>
                        <label for="level">Is it a big, medium or small reward?</label>
                    <select id="level" 
                    name="level" 
                    value={this.state.reward}
                    onChange={this.onCreateLevel}>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Big">Big</option>
                        </select>
                    <input type="Submit" value="Create New Reward"/>
                </form>
                {RewardListElements}
            </div>
        )
    }
}
