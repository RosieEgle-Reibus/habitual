import React, { Component } from 'react'
import axios from 'axios'
import SingleReward from './SingleReward.jsx'
import EOD from './EOD.jsx'

export default class Reward extends Component {
    state = {
        rewardList: [],
        reward: '',
        level: '',
        createReward: false,
        percent: 0,
        smallReward: [],
        mediumReward: [],
        bigReward: [],
        randomReward: ''
    }
    componentDidMount() {
        axios.get('/api/reward')
            .then((res) => {
                this.setState({ rewardList: res.data })
                this.rewardStoreName()
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
        const previousState = { ...this.state }
        const newReward = event.target.value
        previousState.reward = newReward
        this.setState(previousState)
    }

    onCreateLevel = (event) => {
        const previousState = { ...this.state }
        const newLevel = event.target.value
        previousState.level = newLevel
        this.setState(previousState)
    }

    onRewardDeleteClick = (habitId) => {
        axios.delete(`/api/reward/${habitId}`)
            .then(() => {
                this.refreshRewardComponent()
            })
    }

    toggleCreateForm = () => {
        const createReward = !this.state.createReward
        this.setState({ createReward })
    }

    pointPercent = () => {
        const { potentialPoints } = this.props
        const { pointsEarned } = this.props
        const percentDecimal = (pointsEarned / potentialPoints) * 100
        const percent = percentDecimal.toFixed(2)
        return percent
    }


    randomReward = () => {
        if (this.pointPercent() <= 50) {
            const previousState = { ...this.state }
            let rand = Math.random()
            let totalRewards = this.state.smallReward.length
            let randIndex = Math.floor(rand * totalRewards)
            let randomReward = this.state.smallReward[randIndex]
            return randomReward
        } if (this.pointPercent() <= 75) {
            let rand = Math.random()
            let totalRewards = this.state.mediumReward.length
            let randIndex = Math.floor(rand * totalRewards)
            let randomReward = this.state.mediumReward[randIndex]
            return randomReward
        } else {
            let rand = Math.random()
            let totalRewards = this.state.bigReward.length
            let randIndex = Math.floor(rand * totalRewards)
            let randomReward = this.state.bigReward[randIndex]
            return randomReward
        }
    }


    rewardStoreName = () => {
        this.state.rewardList.map((reward) => {
            let newReward = reward.reward
            if (reward.level === "Small") {
                this.setState({
                    smallReward: [
                        ...this.state.smallReward,
                        newReward
                    ]
                })
                console.log("Small Rewards", this.state.smallReward)
                return this.state.smallReward
            } if (reward.level === "Medium") {
                this.setState({
                    mediumReward: [
                        ...this.state.mediumReward,
                        newReward
                    ]
                })
                console.log("Medium Rewards", this.state.mediumReward)
            } else {
                this.setState({
                    bigReward: [
                        ...this.state.bigReward,
                        newReward
                    ]
                })
                console.log("Big Rewards", this.state.bigReward)
            }
        })
    }


    render() {
        const {
            potentialPoints,
            pointsEarned
        } = this.props

        const RewardListElements = this.state.rewardList.map((reward) => {
            return (
                <div className="reward-master-container">
                    <SingleReward
                        rewardId={reward._id}
                        reward={reward.reward}
                        level={reward.level}
                        onRewardDeleteClick={this.onRewardDeleteClick}
                        refreshRewardComponent={this.refreshRewardComponent}
                    />
                </div>
            )
        })
        return (
            <div >
                <EOD
                    potentialPoints={this.props.potentialPoints}
                    pointsEarned={this.props.pointsEarned} 
                    />
                  <h1>Today's Reward: {this.randomReward()}</h1>  

                <h2>Potential Points: {potentialPoints}</h2>
                <h2>Points Earned: {pointsEarned}</h2>
                <h2>{this.pointPercent()}%</h2>
                <h2>REWAAAAAARRRD Yo' Self</h2>
                <button onClick={this.toggleCreateForm}>Add New Reward</button>
                {this.state.createReward ?
                    <form onSubmit={this.createNewReward}>
                        <label for="reward">Add a new way to reward yourself
                    </label>
                        <input
                            type="string"
                            placeholder="New Reward"
                            id="reward"
                            value={this.state.reward}
                            onChange={this.onCreateReward} />
                        <label for="level">Is it a big, medium or small reward?</label>
                        <select id="level"
                            name="level"
                            value={this.state.level}
                            onChange={this.onCreateLevel}>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Big">Big</option>
                        </select>
                        <input type="Submit" value="Create New Reward" />
                    </form> : null}
                    
                    <div className="reward-container">
                {RewardListElements}
                </div>
               

            </div>
        )
    }
} 
