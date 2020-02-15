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
            if (user) {
                return false;
            } else {
                const hashedPassword = await bcrypt.hash(body.password, 10)
                const newUser = {
                    name: body.name,
                    email: body.email,
                    password: hashedPassword,
                    role: "customer", // change to admin as per requirement
                    
                    
                    adress: {
                        street: body.adress.street,
                        zip: body.adress.zip,
                        city: body.adress.city
                    }
                }
                return await usersDB.insert(newUser);
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
                         const payload = {
                          email: user.email,
                           role:user.role,
                           _id: user._id
               
                 }
                    const secret = process.env.TOKEN_SECRET
                    const token = jwt.sign(payload, secret);
                    
           

                     const userAuth = {

                        token:token,
                      user: {
                           email: user.email,
                            name: user.name,
                            role: user.role,
 
                     adress: {
                     street: user.adress.street,
                     city: user.adress.city,
                     zip: user.adress.zip
                      },
                    } 
                     } 
                     return userAuth

            }
        
             else {
                return false
            }
               
        
        }
    }
};










