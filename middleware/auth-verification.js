const jwt = require("jsonwebtoken");

//Middleware has access to req, res
//Next is callback
module.exports = function(req, res, next)
{
    //Get token from header
    const token = req.header("x-auth-token");

    //Check if not token
    if(!token)
    {
        //Not authorized
        return res.status(401).json({msg: "No token, authorization denied"});
    }

    //Verify token
    try {
        console.log("verify", process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //User in payload jwt
        req.user = decoded.user;
        next();
    } catch (error) {
        //Token is invalid
        return res.status(401).json({msg: "Token is not valid"});
    }
};