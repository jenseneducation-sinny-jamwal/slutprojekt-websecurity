var  Datastore  =  require('nedb');
var  usersDB =  new  Datastore({ filename:  'users.db', autoload:  true });
usersDB.loadDatabase();










module.exports = Datastore('user',usersDB);