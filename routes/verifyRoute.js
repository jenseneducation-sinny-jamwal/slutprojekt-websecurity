const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = {
  async verifyRoute(req, res, next)  {
    const token = req.headers.authorization; 
    if (!token) 
    {
      res.status(400).json({message:'token is not found'})
        }
      try {
        const verifiedUser = jwt.verify(token.replace("Bearer ", ""),process.env.TOKEN_SECRET );
        req.user = verifiedUser;
    
      } catch (error) {
        res.status(400).json({message:'user is not verified'})
        //console.log(error);
      }
     
    
    next()
    
  }
}
