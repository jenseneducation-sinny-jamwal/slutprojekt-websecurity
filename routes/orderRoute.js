const {Router} = require('express');
const router = new Router();
const orderDB = require('../model/order');

router.get('/order', async(req,res) =>{
    const order = await orderDB.all()
    res.json(order)
    
});

router.get('/order/:id', async (req, res) => {
    const order = await orderDB.create(req.params.id);
    if(order){
        res.json(order)
        
    } else{
        res.json({ message: 'order created' })
    }
});

router.post('/orders', async (req, res) => {
    const order = await orderDB.create(req.body);
    if(order){
        res.json(order)
        
    } else{
        res.json({ message: 'Product created' })
    }
});
module.exports = router;