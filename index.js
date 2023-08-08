// on require dotenv, la dépendance qui nous permet de déclarer des variables d'environemment 
require('dotenv').config()

// on require la dépendance express et on l'assigne à app 
const express = require('express')
const app = express()
const fs = require('fs');


// nous permet de parser notre body et ainsi bien insérer la data dans notre BDD noSQL
app.use(express.urlencoded({
    extended : false
}))

// on require la dépendance cors, qui nous permet d'établir et d'autoriser l'écoute de notre API par une UI ou bien une solution comme Postman
const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// Par défaut, mon serveur n'accepte pas les requêtes d'origine différente (pas le même nom de domaine)
app.use(cors(corsOptions));



// on import le router
const userRouter = require('./routes/user')
const postRouter = require('./routes/post')


app.use('/users', userRouter)
app.use('/posts', postRouter)
const path = require('path')


app.use('/images', express.static('public/images'));


app.get('/images', (req, res) => {
  fs.readdir('public/images', (err, files) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    res.send({ images: files });
  });
});



app.get('/public/images/:filename', (req, res) => {
    const file = `public/images/${req.params.filename}`;
    res.sendFile(path.resolve(file));
  });


app.get('/', (req, res) => {
    res.send('Welcome to our API')
})

// on déclare le PORT qui va être assigné à notre variable d'environnement ou bien le port 3000 si il ne trouve la variable env
const PORT = process.env.PORT || 3000


// ici le .use nous permet d'appliquer notre middleware à l'ensemble de notre application


// mongoose est la dépendance qui permet d'établir une connexion à notre BDD en noSQL et définir des modèles ainsi que de faire les requêtes
const mongoose = require('mongoose')


const mongoDB_URI = process.env.MONGO_URI;
mongoose.connect(mongoDB_URI, {useNewUrlParser: true});

const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

