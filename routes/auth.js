
const {Router} = require('express');
const router = new Router();
const bcrypt  =  require('bcryptjs');
const jwt = require("jsonwebtoken");

// importing user model
const User = require('../model/user');

router.get('/', async (req,res) => {
    const user = await User.all()
    res.json(user)
})



router.post('/register', async(req,res) =>{

    const user = await User.newUser(req.body)
    if (user) {
        res.json(user)
    } else {
        res.send(' problem with register');
    }
});


router.post("/auth", async (req, res) => {
    const userAuth = await User.userLogin(req.body)
    const secret = process.env.SECRET
    if (userAuth) {
        const verify = jwt.verify(userAuth, secret)
        res.json(verify)
    } else {
        res.send(" not authorized");
    }
});






/*
   // res.send("register is working");
     //creating user 
     // Hashing Password
     const salt = await bcrypt.genSalt(8);
     const hashedPassword = await bcrypt.hash(req.body.password,salt);

//const hashedPassword =  bcrypt.hash(req.body.password,8);
     const user = new User({
        name:req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role:req.body.role,
        adress:{
            street: req.body.adress.street,
            city :req.body.adress.city,
            zip: req.body.adress.zip,
        },
        
    })
       await User.NewUser(req.body)
        res.status(201).json(user)
        
    }) */






module.exports = router