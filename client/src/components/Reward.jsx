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
        randomReward: '',
        showRewards: false
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
    toggleRewards = () => {
        const showRewards = !this.state.showRewards
        this.setState({ showRewards })
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

                <SingleReward
                    rewardId={reward._id}
                    reward={reward.reward}
                    level={reward.level}
                    onRewardDeleteClick={this.onRewardDeleteClick}
                    refreshRewardComponent={this.refreshRewardComponent}
                />

            )
        })
        return (
            <div className="reward-master-container">
                {/* <EOD
                    potentialPoints={this.props.potentialPoints}
                    pointsEarned={this.props.pointsEarned} 
                    /> */}
                <h1 className="title-points">Today's Reward:</h1>
                
                <div className="today-reward">
                    <h1 className="today-reward-font">{this.randomReward()}</h1>
                </div>
                <h1 className="frac=small"><sup  >{pointsEarned}</sup>/<span >{potentialPoints}</span></h1>
                
                {/* <h2>Great Job! You've earned it! You're a phenomal, amazing majectic, goal achiever!</h2> */}
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
                    <i className="material-icons  add"
                            onClick={() => this.toggleCreateForm()}>
                            add_circle_outline
            </i>
                <button onClick={this.toggleRewards}>See All Rewards</button>
               
                {this.state.showRewards ?
                    <div className="reward-container">
                      
                        {RewardListElements}
                    </div> : null}
            </div>
        )
    }
} 
