const express = require('express')
const app = express()
const Datastore = require('nedb')
//const usersDB = new Datastore('/model/users.db') 
//connecting db
//usersDB.loadDatabase();


// importing Routes gor auth

const authRoute = require('./routes/auth');



app.use(express.static('public'))



//middleware for parsing json data
app.use(express.json());



//auth Route Middleware
app.use('/api/user',authRoute);


app.listen(3000, () => console.log("Server started"))