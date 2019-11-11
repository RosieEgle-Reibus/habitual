import React, { Component } from 'react'
import axios from 'axios'
import SingleReward from './SingleReward.jsx'

export default class Reward extends Component {
    state = {
        rewardList: [],
        reward: '',
        level: '',
        createReward: false,
        percent: 0,
        smallReward: [],
        mediumReward: [] ,
        bigReward: []       
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

    onRewardDeleteClick = (habitId) => {
        axios.delete(`/api/reward/${habitId}`)
        .then(() => {
            this.refreshRewardComponent()
        })
    }

    toggleCreateForm = () => {
        const createReward = !this.state.createReward
        this.setState({createReward})
    }

    pointPercent = () => {
        const {potentialPoints} = this.props
        const {pointsEarned} = this.props
        const percentDecimal =  (pointsEarned / potentialPoints) * 100
        const percent = percentDecimal.toFixed(2)
        return percent 
    }

    // randomRewardSmall = () => {
    //     if (this.pointPercent() <= 50) { 
    //             if (this.state.rewardList.level === "Small") {
    //                 let smallRandomReward = this.state.rewardList[Math.floor(Math.random()*this.state.rewardList.length)]
    //                 console.log(smallRandomReward)
    //                 return smallRandomReward
    //             }
    //     }
    // }

    randomReward = () => {
       let rand = Math.random()
       let totalRewards = this.state.smallReward.length
       let randIndex = Math.floor(rand * totalRewards)
       let randomReward = this.state.smallReward[randIndex]
        return randomReward
    }

    // rewardStoreName = () => {
    //     this.state.rewardList.map((reward) => {
    //         // if(reward.level === "Small") {
    //         // const previousState = this.state.smallReward
    //         // let rewardName = reward.reward
    //         // this.setState({smallReward: rewardName})
    //         // console.log(this.state.smallReward)
    //         // }
    //         // else {
    //         //     return "Error"
    //         // }
    //         // this.setState(state => {
    //         //   const smallReward = [...state.smallReward, reward.reward] 
    //         //   return smallReward 
    //         // })
    //     })
    // }

     rewardStoreName = () => {
        this.state.rewardList.map((reward) => {
          let newReward = reward.reward
          this.setState({
              smallReward: [
                  ...this.state.smallReward,
                  newReward
              ]
          })
         console.log(this.state.smallReward)
          return this.state.smallReward
        })
    }


     render() {
        const {
            potentialPoints,
            pointsEarned
        } = this.props

        const RewardListElements = this.state.rewardList.map((reward) => {
            return (
                <div>
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
            <div>
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
                        onChange={this.onCreateReward}/>
                        <label for="level">Is it a big, medium or small reward?</label>
                    <select id="level" 
                    name="level" 
                    value={this.state.level}
                    onChange={this.onCreateLevel}>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Big">Big</option>
                        </select>
                    <input type="Submit" value="Create New Reward"/>
                </form> : null }

                {RewardListElements}

                <h1>Random Reward: {this.randomReward()}</h1>
            </div>
        )
    }
}
