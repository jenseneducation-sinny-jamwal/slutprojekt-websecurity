const Datastore  =  require('nedb-promise');
const orderDB =  new Datastore({ filename:'Data/order.db', autoload: true });
const User = require("./user");
const Product = require("./product");

module.exports = {

      async all() {
        return await orderDB.find({}); 
       },

       async getOne(userId) {
          return await orderDB.findOne({owner:userId})
      },

 async create(body , userId) {
/*
    let total = 0
    const value = body.items
    for (let item of value) {
        const product  = await Product.getOne(item)

        total += product.price
    } */


     const order = {
           owner: userId,
           timeStamp: Date.now(),
           status: "inProcess",
           items: body.items,
          // orderValue: total

     }
     //return await orderDB.insert(order)
     
     


     const updateOrder =  await orderDB.insert(order)
         await User.myPayment(userId,body.payment)
         await User.myOrder(userId,updateOrder._id)
         return updateOrder
    },   
   

}