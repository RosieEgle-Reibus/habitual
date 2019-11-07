
const mongoose = require('./connection.js')

const HabitSchema = new mongoose.Schema({
  habit: String,
  expectedTimesPerDay: Number,
  totalTimesCompleted: { type:Number, default: 0},
  difficulty: Number,
  userId: mongoose.Types.ObjectId,

})

const HabitCollection = mongoose.model('Habit', HabitSchema)

/* Step 4
 *
 * TODO: delete this it's just a sample
 *
 */

 //getAll
 const getAllHabits = () => {
   return HabitCollection.find()
 }

 //getOne
 const getOneHabit = (habitId) => {
   return HabitCollection.findById({_id: habitId})
 }

 //creature
 const createHabit = (habitData) => {
  return HabitCollection.create(habitData)
 }

 //update
 const updateHabit = (habitId, habitData) => {
  return HabitCollection.update({_id: habitId}, habitData)
 }

 //delete
 const deleteHabit = (habitId) => {
   return HabitCollection.deleteOne({_id: habitId})
 }


/* Step 5
 *
 * TODO: export all functions from this file by adding their names as keys to this
 * object
 */
module.exports = {
  getAllHabits,
  getOneHabit,
  createHabit,
  updateHabit,
  deleteHabit
}
