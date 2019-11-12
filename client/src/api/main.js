import axios from 'axios'
let habitList = []

const getAllHabits =() => {
    return axios.get('/api/habit')
        .then((res) => {
            habitList = res.data
        })
}
const totalEarnedPointsCalc = (habitList) => {
    let totalPoints = 0
    habitList.forEach((habit) => {
      if (habit.difficulty <= 5) {
        let potPoints = habit.difficulty * 30
        let percentDecimals = (habit.totalTimesCompleted / habit.expectedTimesPerDay)
        let percent = percentDecimals
        totalPoints += potPoints * percent
        console.log('In Earned Function')
        console.log('Diificulty', habit.difficulty)
        console.log("habit.totalTimesCompleted", habit.totalTimesCompleted)
        console.log("habit.expectedTimesPerDay", habit.expectedTimesPerDay)
        console.log("potentialPoints", potPoints)
        console.log("percent", percent)
        console.log('totalPoints', totalPoints)
      } else {
        let potPoints = habit.difficulty * 50
        let percentDecimals = (habit.totalTimesCompleted / habit.expectedTimesPerDay)
        let percent = percentDecimals
        totalPoints += potPoints * percent
        console.log('In Earned Function')
        console.log('Diificulty', habit.difficulty)
        console.log("habit.totalTimesCompleted", habit.totalTimesCompleted)
        console.log("habit.expectedTimesPerDay", habit.expectedTimesPerDay)
        console.log("potentialPoints", potPoints)
        console.log("percent", percent)
        console.log('totalPoints', totalPoints)
      }
    })

    return totalPoints;
  }

  const totalPotentialPointsCalc = (habitList) => {
    let totalPoints = 0
    habitList.forEach((habit) => {
      if (habit.difficulty <= 5) {
        let potPoints = habit.difficulty * 30
        totalPoints += potPoints 
        console.log('In Potential Function')
        console.log('Diificulty', habit.difficulty)
        console.log("potentialPoints", potPoints)
        console.log('totalPoints', totalPoints)
      } else {
        let potPoints = habit.difficulty * 50
        totalPoints += potPoints
        console.log('In Potential Function')
        console.log('Diificulty', habit.difficulty)
        console.log("potentialPoints", potPoints)
        console.log('totalPoints', totalPoints)
      }
    })

    return totalPoints;
  }




export {
    getAllHabits,
    totalEarnedPointsCalc,
    totalPotentialPointsCalc
}