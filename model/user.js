var  Datastore  =  require('nedb');
var  usersDB =  new  Datastore({ filename:  'users.db', autoload:  true });
usersDB.loadDatabase();

module.exports = {

    // Insert user into database
    // If content argument is missing, use empty string
    // Return the created resource

    
    async create(body){

        return await usersDB.insert({
            name: body.name ,
            email:body.email,
            password:body.password,
            adress:{
                street:body.adress.street,
                zip: body.adress.zip,
                city:body.adress.city

            }
        }) 
    },

    // Find the user with the corresponding ID
    // Return the resource
    async get(userID){
        return await usersDB.findOne({_id:userID})
    },

    // Find all users
    // Return the resources
    async all(){
        return await usersDB.find({})
    },

    // Try to remove the user with corresponding ID
    // Returns if any documents were removed
    async remove(userID){
        const numDeleted = await usersDB.remove({_id:userID})
        return numDeleted > 0
    },

    // Try to update the user with corresponding ID
    // Returns if any user were updated
    async update(userID, body){        
        const numUpdated = await usersDB.update(
            {_id:userID},
            {$set:{
                    content: body.content || usersDB.content
            }}
        )
        return numUpdated > 0
    }
}











