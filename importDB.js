const Datastore = require("nedb-promise")
const products =require("./Data/product.json")

const db = new Datastore({filename:"Data/product.db", autoload:true})

products.forEach(product => {
    db.insert(product, ()=>{})
})