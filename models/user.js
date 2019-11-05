const mongoose = require('./connection.js')

const UserSchema = new mongoose.Schema({
  userName: String,
  password: String,
})

const userCollection = mongoose.model('User', UserSchema)

//getAll
const getAllUsers = () => {
    return userCollection.find()
}

//getOne
const getOneUser = (userId) => {
    return userCollection.findById({_id: userId})
}

//create 
const createUser = (userData) => {
    return userCollection.create(userData)
}

//update
const updateUser = (userId, userData) => {
    return userCollection.update({_id: userId}, userData)
}

//delete
const deleteUser = (userId) => {
    return userCollection.deleteOne({_id: userId})
}




module.exports = {
   getAllUsers,
   getOneUser,
   createUser,
   updateUser,
   deleteUser
  }