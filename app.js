const express = require('express')
const app = express()



// importing Routes for  user auth , product and order

const authRoute = require('./routes/auth');
const productRoute = require('./routes/productRoute');
const  orderRoute = require('./routes/orderRoute');

app.use(express.static('public'))


//middleware for parsing json data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use('/api/',authRoute);   // user auth Route Middleware
app.use('/api/',productRoute); // prouduct Route middleware
app.use('/api/', orderRoute);   



app.listen(3000, () => console.log("Server started"))