import axios from 'axios'


const getAllHabits =() => {
    return axios.get('/api/habit')
        .then(res => res.data)
}
const totalEarnedPointsCalc = () => {
    this.state.habitList.map((habit) => {
      const previousState = this.state.pointsEarned
      if (habit.difficulty <= 5) {
        let potPoints = habit.difficulty * 30
        let percentDecimals = (habit.totalTimesCompleted / habit.expectedTimesPerDay)
        let percent = percentDecimals.toFixed()
        let pointsEarnedDecimal = potPoints * percent
        let totalPotPoints = previousState + pointsEarnedDecimal
        this.setState({ pointsEarned: totalPotPoints })
        return totalPotPoints
      } else {
        let potPoints = habit.difficulty * 50
        let percentDecimals = (habit.totalTimesCompleted / habit.expectedTimesPerDay)
        let percent = percentDecimals.toFixed()
        let pointsEarnedDecimal = potPoints * percent
        let totalPotPoints = previousState + pointsEarnedDecimal
        this.setState({ pointsEarned: totalPotPoints })
        return totalPotPoints
      }
    })
  }



export {
    getAllHabits,
    totalEarnedPointsCalc
}