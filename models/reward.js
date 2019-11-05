const mongoose = require('./connection.js')

const RewardSchema = new mongoose.Schema({
  reward: String,
  level: String,
  userId: Number

})

const rewardCollection = mongoose.model('Reward', RewardSchema)

//getAll 
const getAllRewards = () => {
   return rewardCollection.find()
}

//getOne
 const getOneReward = (rewardId) => {
     return rewardCollection.findById({_id: rewardId})
 }

 //create
 const createReward = (rewardData) => {
     return rewardCollection.create(rewardData)
 }

 //update
 const updateReward = (rewardId, rewardData) => {
     return rewardCollection.update({_id: rewardId}, rewardData)
 }

 //delete
 const deleteReward =(rewardId) => {
     return rewardCollection.deleteOne({_id: rewardId})
 }


module.exports = {
    getAllRewards,
    getOneReward,
    createReward,
    updateReward,
    deleteReward
  }