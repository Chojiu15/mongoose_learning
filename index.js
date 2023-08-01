// on require dotenv, la dépendance qui nous permet de déclarer des variables d'environemment 
require('dotenv').config()

// on require la dépendance express et on l'assigne à app 
const express = require('express')
const app = express()

// nous permet de parser notre body et ainsi bien insérer la data dans notre BDD noSQL
app.use(express.urlencoded({
    extended : false
}))

// on require la dépendance cors, qui nous permet d'établir et d'autoriser l'écoute de notre API par une UI ou bien une solution comme Postman
const cors = require('cors')

// on import le router
const userRouter = require('./routes/user')

app.use('/users', userRouter)

// on déclare le PORT qui va être assigné à notre variable d'environnement ou bien le port 3000 si il ne trouve la variable env
const PORT = process.env.PORT || 3000


// ici le .use nous permet d'appliquer notre middleware à l'ensemble de notre application
app.use(cors())

// mongoose est la dépendance qui permet d'établir une connexion à notre BDD en noSQL et définir des modèles ainsi que de faire les requêtes
const mongoose = require('mongoose')


const mongoDB_URI = process.env.MONGO_URI;
mongoose.connect(mongoDB_URI, {useNewUrlParser: true});

const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

