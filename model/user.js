const Datastore  =  require('nedb-promise');
const usersDB =  new  Datastore({ filename:'Data/users.db', autoload:  true });
usersDB.loadDatabase();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()


module.exports = {
    async newUser(body) {
        if (body.password === body.repeatPassword) {
            const user = await  usersDB.findOne({ email: body.email })
            if (!user) {
                return false;
            } else {
                const hashedPassword = await bcrypt.hash(body.password, 10)
                const myNewUser = {
                    name: body.name,
                    email: body.email,
                    password: hashedPassword,
                    role: "admin",
                    
                    
                    adress: {
                        street: body.adress.street,
                        zip: body.adress.zip,
                        city: body.adress.city
                    }
                };
                return await usersDB.insert(myNewUser);
            }
        } else {
            return false;
        }
    },


    async userLogin(body) {
        const user = await  usersDB.findOne({email:body.email});
        if (!user) {
            return false
        } else {
            const passwordMatch = await bcrypt.compare(body.password, user.password)
            
            if (passwordMatch) {
                     
                const userAuth = {
                   

                    user: {
                     email: user.email,
                     name: user.name,
                     role: user.role,
 
                     adress: {
                     street: user.adress.street,
                     city: user.adress.city,
                     zip: user.adress.zip
                      }
                    } 
                }
                const payload = {
                    email: user.email,
                     role:user.role,
                   _id: user._id
               
                
           }
            const secret = process.env.TOKEN_SECRET
            const token = jwt.sign(payload, secret);
            console.log(token);

                
               return userAuth
              
                
            }
        
             else {
                return false
            }
               
        
        }
    }
}










