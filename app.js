const express = require('express')
const app = express()
const Datastore = require('nedb')

const usersDB = new Datastore('/model/users.db') 
//connecting db
usersDB.loadDatabase();


// importing Routes gor auth

const authRoute = require('./routes/auth');
const productRoute = require('./routes/productRoute');




app.use(express.static('public'))


//middleware for parsing json data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.use('/api/',authRoute);   // user auth Route Middleware
app.use('/api/',productRoute); // prouduct Route middleware


app.listen(3000, () => console.log("Server started"))