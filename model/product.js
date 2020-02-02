var  Datastore  =  require('nedb');
var  productsDB =  new  Datastore({ filename:  'product.db', autoload:  true });
productsDB.loadDatabase();
