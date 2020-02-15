const {Router} = require('express');
const router = new Router();
const productDB = require('../model/product');
const verifyRoute = require('./verifyRoute') ;

router.get('/products', async(req,res) =>{
    const product = await productDB.all()
    res.json(product)
    
});


router.get('/products/:id', async (req, res) => {
    const product = await productDB.getOne(req.params.id); //getting the product by id
    if(product){
        res.json(product)
        
    } else{
        res.json({ message: 'Product created' })
    }
});

router.post('/products',verifyRoute.verifyRoute, async (req, res) => {

    if(req.user.role === "admin"){
        const product = await productDB.create(req.body)
            res.json(product)
    
    } else{
            res.json({ message: 'Product created' })
    }
});
    


router.patch('/products/:id',verifyRoute.verifyRoute, async (req, res) => {
    const product = await productDB.update(req.params.id, req.body);
    if(product){
        res.json(product)
        
    } else{
        res.json({ message: 'Product updated' })
    }
});

router.delete('/products/:id',verifyRoute.verifyRoute, async (req, res) => {
    const product = await productDB.remove(req.params.id);
    
    if(user){
        res.json(product)
        
    } else{
        res.json({ message: 'Product removed' })
    }
}) 
module.exports = router;



