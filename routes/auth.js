
const {Router} = require('express');
const router = new Router();

// importing user model
const User = require('../model/user');



router.get('/', async (req,res) => {
    const user = await User.all()
    res.json(user)
})


router.post('/register', async(req,res) =>{

   // res.send("register is working");
     //creating user 
        const user = await User.create(req.body)
        res.status(201).json(user)
    })






module.exports = router