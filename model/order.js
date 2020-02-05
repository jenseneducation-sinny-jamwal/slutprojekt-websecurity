const Datastore  =  require('nedb-promise');
const orderDB =  new Datastore({ filename:'Data/order.db', autoload: true });

module.exports = {

async orderDB(){
     return await orderDB.find({}); 
 },

 async create(body) {
     const newOrder = {

    
        timeStamp: Date.now(),
         status: "inProcess",
         items: body.items,
        orderValue: body.orderValue

     }
     return await orderDB.insert(newOrder)
            
    }




}