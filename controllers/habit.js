
const express = require('express')

const habitApi = require('../models/habit.js')

const habitRouter = express.Router()

//getAll
habitRouter.get('/', (req, res) => {
  habitApi.getAllHabits()
  .then((allHabits) => {
    res.json(allHabits)
  })
})

//getOne
habitRouter.get('/:id', (req, res) => {
  habitApi.getOneHabit(req.params.id)
  .then((singleHabit) => {
    res.json(singleHabit)
  })
})

//createOne
habitRouter.post('/', (req, res) => {
  habitApi.createHabit(req.body)
  .then((createdHabit) => {
    res.json(createdHabit)
  })
})

//updateOne
habitRouter.put('/:id', (req, res) => {
  habitApi.updateHabit(req.params.id, req.body)
  .then((updatedHabit) => {
    res.json(updatedHabit)
  })
})

//deleteOne
habitRouter.delete('/:id', (req, res) => {
  habitApi.deleteHabit(req.params.id)
  .then((deletedHabit) => {
    res.json(deletedHabit)
  })
})


module.exports = {
  habitRouter
}
