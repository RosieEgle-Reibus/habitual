import axios from 'axios'

let habitList = []

const getAllHabits =() => {
    return axios.get('/api/habit')
        .then((res) => {
            habitList = res.data
        })
}

//calculates total POTENTIAL points for individual habit
const potentialPointsCalc = (difficulty) => {
  if (difficulty <= 5) {
    let potentialPoints = difficulty * 30
    return potentialPoints
  } else {
    let potentialPoints = difficulty * 50
    return potentialPoints
  }
}


//calculates total EARNED points for individual habit
const pointsEarnedCalc = (difficulty, totalTimesCompleted, expectedTimesPerDay) => {
  if (difficulty <= 5) {
    let potentialPoints = difficulty * 30
    let percentDecimals = (totalTimesCompleted / expectedTimesPerDay)
    let pointsEarnedDecimal = potentialPoints * percentDecimals
    let pointsEarned = pointsEarnedDecimal.toFixed()
    return pointsEarned
  } else {
    let potentialPoints = difficulty * 50
    let percentDecimals = (totalTimesCompleted / expectedTimesPerDay)
    let pointsEarnedDecimal = potentialPoints * percentDecimals
    let pointsEarned = pointsEarnedDecimal.toFixed()
    return pointsEarned
  }
}


//calculates total cumulative points EARNED for all habit completions
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

//calculates total cumulative POTENTIAL points for all habits
  const totalPotentialPointsCalc = (habitList) => {
    let totalPoints = 0
    habitList.forEach((habit) => {
      if (habit.difficulty <= 5) {
        let potPoints = habit.difficulty * 30
        totalPoints += potPoints 
      } else {
        let potPoints = habit.difficulty * 50
        totalPoints += potPoints
      }
    })
    return totalPoints;
  }

export {
    getAllHabits,
    totalEarnedPointsCalc,
    totalPotentialPointsCalc,
    potentialPointsCalc,
    pointsEarnedCalc
    
}