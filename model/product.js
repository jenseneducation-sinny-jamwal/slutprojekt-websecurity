const Datastore  =  require('nedb');
const productDB =  new Datastore({ filename:'/Data/product.db', autoload: true });

module.exports ={
    async  all(){
        return await productDB.find({})
    },

    async get(id){
         return await productDB.findOne({_id: id})

    },

      async create(body) {

        return await productDB.insert({
            serial : body.serial,
            title: body.title,
            price: body.price,
            shortDesc: body.shortDesc,
            longDesc: body.longDesc,
            imgFile: body.imgFile
          })

        },

      async remove(id) {
            return await productDB.remove({_id: id})
         },

          
       async update(id, body){        
               const  product = await productDB.findOne({ _id: id })
                product = await productDB.update(product, { $set: body })
                return product   

        }

    
    


}
