import React, { Component } from 'react'
import axios from 'axios'

export default class SingleReward extends Component {
    state = {
        changeReward: {
            rewardId: '',
            reward: '',
            level: ''
        },
        editReward: false

    }

    componentDidMount() {
        const previousState = {...this.state}
        previousState.changeReward = this.props
        this.setState(previousState)
    }

    changeSingleReward = (event) => {
        event.preventDefault()
        const { refreshRewardComponent } = this.props
        const { rewardId } = this.state.changeReward
        axios.put(`/api/reward/${rewardId}`, this.state.changeReward)
            .then(() => {
                refreshRewardComponent()
            })
    }
    onChangeReward = (event) => {
        const newState = { ...this.state.changeReward }
        const currentReward = event.target.value
        newState.reward = currentReward
        this.setState({ changeReward: newState })
    }

    onChangeLevel = (event) => {
        const newState = { ...this.state.changeReward }
        const currentLevel = event.target.value
        newState.level = currentLevel
        this.setState({ changeReward: newState })
    }

    toggleEditForm = () => {
        const editReward = !this.state.editReward
        this.setState({editReward})
    }

    render() {
        const {
            rewardId,
            reward,
            level,
            onRewardDeleteClick,
        } = this.props
        return (
            <div key={rewardId} className="reward">
                <div>
                <h1>{reward} <i className="material-icons  edit"
                onClick={() => this.toggleEditForm()}>
                edit
            </i></h1>
            {this.state.editReward ? 
                <form onSubmit={this.changeSingleReward}>
                    <input
                        type="String"
                        placeholder="Reward"
                        value={this.state.changeReward.reward}
                        onChange={this.onChangeReward} />
                    <select id="level"
                        name="level"
                        value={this.state.changeReward.level}
                        onChange={this.onChangeLevel}>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Big">Big</option>
                    </select>
                    <input type="Submit" value="Save Changes" />
                </form> :  null }
            </div>
              <div>
                <h2>Level of Reward: {level}</h2>
                </div>
               

                <i className="material-icons delete"
                onClick={() => onRewardDeleteClick(rewardId)}>
                clear
            </i>
            </div>
        )
    }
}
