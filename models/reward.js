const mongoose = require('./connection.js')

const RewardSchema = new mongoose.Schema({
  reward: String,
  level: String,
  userId: Number

})

const rewardCollection = mongoose.model('Reward', RewardSchema)

//getAll 
const getAllRewards = () => {
    rewardCollection.find()
}

//getOne
 const getOneReward = (rewardId) => {
     rewardCollection.findById({_id: rewardId})
 }

 //create
 const createReward = (rewardData) => {
     rewardCollection.create(rewardData)
 }

 //update
 const updateReward = (rewardId, rewardData) => {
     rewardCollection.update({_id: rewardId}, rewardData)
 }

 //delete
 const deleteReward =(rewardId) => {
     rewardCollection.deleteOne({_id: rewardId})
 }




module.exports = {
    getAllRewards,
    getOneReward,
    createReward,
    updateReward,
    deleteReward
  }