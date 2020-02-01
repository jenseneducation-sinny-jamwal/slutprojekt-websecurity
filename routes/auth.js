const router= require('express').Router ();

// importing user model
const User = require('../model/user');

router.post('/register', async(req,res) =>{

    res.send("register is working");

    //creating user 

 const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password

    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.send(err);
    }

});






module.exports = router;