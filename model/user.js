var  Datastore  =  require('nedb');
var  usersDB =  new  Datastore({ filename:  'users.db', autoload:  true });
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
                return await  usersDB.insert(myNewUser);
            }
        } else {
            return false;
        }
    },

    async userLogin(body) {
        const user = await  usersDB.findOne({});
        if (user.email !== body.email) {
            return false
        } else {
            const passwordMatch = await bcrypt.compare(body.password, user.password)
            if (passwordMatch) {
                const payload = {
                    token: "JWT_TOKEN",
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
                const secret = process.env.SECRET
                return jwt.sign(payload, secret)
            } else {
                return false
            }
        }
    }
};










