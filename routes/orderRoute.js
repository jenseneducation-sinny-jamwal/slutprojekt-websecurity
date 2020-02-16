const {Router} = require('express');
const router = new Router();
const orderDB = require('../model/order');
const verifyRoute = require('./verifyRoute') ;

router.get('/', verifyRoute.verifyRoute ,async(req,res) =>{
    try {
         if (req.user.role === "admin"){
            const user = await orderDB.find();
            res.json(user);

         }else if(req.user.role === "customer"){
             const user = await orderDB.getOne(req.user.ID);
             res.json(user);
           }
         } catch (error) {
       
           res.json({ message: error });
         }
   
    
  });

router.post('/', verifyRoute.verifyRoute, async (req, res) => {
    try {
        const userOrder = await orderDB.create(req.body, req.user.userId);
        res.json(userOrder);
      } catch (error) {
        
        res.json({ message: error });
      }
    

 });
module.exports = router;