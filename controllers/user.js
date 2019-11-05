const express = require('express')

const userApi = require('../models/user.js')

const userRouter = express.Router()

//getAll
userRouter.get('/', (req, res) => {
    userApi.getAllUsers()
        .then((allUsers) => {
            res.json(allUsers)
        })
})

//getOne
userRouter.get('/:id', (req, res) => {
    userApi.getOneUser(req.params.id)
    .then((singleUser) => {
        res.json(singleUser)
    })
})

//create
userRouter.post('/', (req, res) => {
    userApi.createUser(req.body)
    .then((createdUser) => {
        res.json(createdUser)
    })
})

//update
userRouter.put('/:id', (req, res) => {
    userApi.updateUser(req.params.id, req.body)
    .then((updatedUser) => {
        res.json(updatedUser)
    })
})


//delete
userRouter.delete('/:id', (req, res) => {
    userApi.deleteUser(req.params.id)
    .then((deletedUser) => {
        res.json(deletedUser)
    })
})


module.exports = {
    userRouter
}