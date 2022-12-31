const jwt=require('jsonwebtoken');
const jwtSecret="Sachiisaawesomeguy";
const fetchuser=(req,res,next)=>{
    //get the user from the jwt token and add id to req obj
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: " Please authenticate yourself"});
    }
    try {
        const data=jwt.verify(token,jwtSecret)
    req.user = data.user;

    next();
    } catch (error) {
        res.status(401).send({error: " Please authenticate yourself"});
    }   
    
    
}


module.exports=fetchuser;