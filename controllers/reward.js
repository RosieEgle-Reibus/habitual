const express = require('express')

const rewardApi = require('../models/reward.js')

const rewardRouter = express.Router()


//getAll
rewardRouter.get('/', (req, res) => {
    rewardApi.getAllRewards()
    .then((allRewards) => {
        res.json(allRewards)
    })
})

//getOne 
rewardRouter.get('/:id', (req, res) => {
    rewardApi.getOneReward(req.params.id)
    .then((singleReward) => {
        res.json(singleReward)
    })
})

//create
rewardRouter.post('/', (req, res) => {
    rewardApi.createReward(req.body)
    .then((createdReward) => {
        res.json(createdReward)
    })
})

//update
rewardRouter.put('/:id', (req, res) => {
    rewardApi.updateReward(req.params.id, req.body)
    .then((updatedReward) => {
        res.json(updatedReward)
    })
})

//delte
rewardRouter.delete('/:id', (req, res) => {
    rewardApi.deleteReward(req.params.id)
    .then((deltedReward) => {
        res.json(deltedReward)
    })
})


module.exports = {
    rewardRouter
  }