const express = require('express')
const userRouter = express.Router()
const User = require('../models/user')
const upload = require('../middlewares/multer')


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


// userRouter.post('/', (req, res , next) => {
//     User
//     .create(req.body)
//     .then(newUser => res.json(newUser))
//     .catch(err => {
//         console.trace(err)
//         next()
//     })
// })


userRouter.post('/', upload.single('image'), async (req, res) => {

    try{
        const user = await new User({
            first_name: req.body.first_name,
            last_name : req.body.last_name,
            age : req.body.age,
            image: '/public/images/' + req.file.filename
          });
          await user.save()
          res.send('Image uploaded')
    }
    catch(err){
        console.log(err)
    } 
  });
  

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

