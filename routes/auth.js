const router= require('express').Router();
const joi=require('joi');
const { joiPassword } = require('joi-password');
const mysqlconnection= require('../connection');
const {registerValidation,loginValidation}= require('./validation');
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken');
const { json } = require('body-parser');

//register
router.post('/register',(req,res)=>{
   const result=registerValidation(req.body)
    if(result.error) return res.status(404).send(result.error.details[0].message)
    
    //checking already email and username exists
    mysqlconnection.query('select id from login_info where user_name=? or email=? ',[req.body.user_name,req.body.email],async (error,results)=>{
        if (results.length >0) return res.status(400).send('email or username exist')
        
        //hash password
        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        mysqlconnection.query(`insert into login_info (user_name,email,password) values(?,?,?)`,[req.body.user_name,req.body.email,hashedPassword],(error,results)=>{
            if(error) return res.status(500).send(error)
            res.send(results)
        })    
    })
})

//login

router.post('/login',(req,res)=>{
    const result=loginValidation(req.body)
    if(result.error) return res.status(404).send(result.error.details[0].message)
    
    mysqlconnection.query('select * from login_info where email=? ',[req.body.email],async (error,results)=>{
        if (results==0) return res.status(400).send('email does not exist');
        //check password is correct or not
        const validPass= await bcrypt.compare(req.body.password,results[0].password);
        if (!validPass) return res.status(400).send('Invalid password');
        
        // json web token 
        const token=jwt.sign({_id:results[0].id,_email:results[0].email},process.env.TOKEN_SECRET,{expiresIn:'24h'});
        res.json({token})


    })
        

})




module.exports = router;