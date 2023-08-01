const express = require('express')
const userRouter = express.Router()
const User = require('../models/user')


userRouter.get('/', (req, res, next) => {
    User
    .find()
    .then(users => res.json(users))
    .catch(err => {
        console.trace(err)
        next()
    })
})

userRouter.get('/:id', (req, res, next) => {
    User
    .findOne({_id : req.params.id})
    .then(user => res.json(user))
    .catch(err => {
        console.trace(err)
        next()
    })
})


userRouter.post('/', (req, res , next) => {
    User
    .create(req.body)
    .then(newUser => res.json(newUser))
    .catch(err => {
        console.trace(err)
        next()
    })
})

userRouter.put('/:id', async (req, res) => {
    await User.findOne({_id : req.params.id}) // We get the user by ID
    await User.updateOne({$set : req.body}) // update the user
    await User.findOne({_id : req.params.id}) // We get the user by ID
    .then(user => res.json(user))
    .catch(err => console.log(err))
})

userRouter.delete('/:id', (req, res) => {
    User
    .deleteOne({_id : req.params.id})
    .then(() => res.json('The user has been deleted'))
    .catch(err => console.log(err))
})




module.exports = userRouter

