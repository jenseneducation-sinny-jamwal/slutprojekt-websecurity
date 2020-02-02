
const {Router} = require('express');

const router = new Router();
const bcrypt  =  require('bcryptjs');

// importing user model
const User = require('../model/user');



router.get('/', async (req,res) => {
    const user = await User.all()
    res.json(user)
})



router.post('/register', async(req,res) =>{

   // res.send("register is working");
     //creating user 
     // Hashing Password
     const salt = await bcrypt.genSalt(8);
     const hashedPassword = await bcrypt.hash(req.body.password,salt);

//const hashedPassword =  bcrypt.hash(req.body.password,8);
     const user = {
        name:req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role:req.body.role,
        adress:{
            street: req.body.adress.street,
            city :req.body.adress.city,
            zip: req.body.adress.zip,
        },
        
    }
       await User.create(req.body)
        res.status(201).json(user)
        
    })






module.exports = router