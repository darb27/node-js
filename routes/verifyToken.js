const jwt=require('jsonwebtoken');


module.exports=function (req,res,next){
    let token= req.header('Authorization')
    if(!token) return res.status(401).send('Access Denied')

    try{
        token =token.slice(7)
        const verified= jwt.verify(token,process.env.TOKEN_SECRET);
        req.user= verified;
        next();
    }
    catch{   
        res.status(400).send('Invalid Token');
    }
}