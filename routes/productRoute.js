const {Router} = require('express');
const router = new Router();
const productDB = require('../model/product');

router.get('/products', async(req,res) =>{
    const product = await productDB.all()
    res.json(product)
    
});


router.get('/products/:id', async (req, res) => {
    const product = await productDB.create(req.params.id);
    if(product){
        res.json(product)
        
    } else{
        res.json({ message: 'Product created' })
    }
});

router.post('/products', async (req, res) => {
    const product = await productDB.create(req.body);
    if(product){
        res.json(product)
        
    } else{
        res.json({ message: 'Product created' })
    }
});


router.patch('/products/:id', async (req, res) => {
    const product = await productDB.update(req.params.id, req.body);
    if(user){
        res.json(product)
        
    } else{
        res.json({ message: 'Product updated' })
    }
});

router.delete('/products/:id', async (req, res) => {
    const product = await productDB.remove(req.params.id);
    
    if(user){
        res.json(product)
        
    } else{
        res.json({ message: 'Product removed' })
    }
}) 
module.exports = router;



