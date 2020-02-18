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
      } else {
        let potPoints = habit.difficulty * 50
        let percentDecimals = (habit.totalTimesCompleted / habit.expectedTimesPerDay)
        let percent = percentDecimals
        totalPoints += potPoints * percent
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
        // console.log('In Potential Function')
        // console.log('Diificulty', habit.difficulty)
        // console.log("potentialPoints", potPoints)
        // console.log('totalPoints', totalPoints)
      } else {
        let potPoints = habit.difficulty * 50
        totalPoints += potPoints
        // console.log('In Potential Function')
        // console.log('Diificulty', habit.difficulty)
        // console.log("potentialPoints", potPoints)
        // console.log('totalPoints', totalPoints)
      }
    })

    return totalPoints;
  }


  const percentComplete = (totalTimesCompleted, expectedTimesPerDay) => {
    let percentDecimals = (totalTimesCompleted / expectedTimesPerDay) * 100
    let percent = percentDecimals.toFixed()
    return percent
  }



export {
    getAllHabits,
    percentComplete,
    totalEarnedPointsCalc,
    totalPotentialPointsCalc,
    
}