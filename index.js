const mysqlconnection= require('./connection');
const express= require('express');
const app = express();
app.use(express.json());
const dotenv= require('dotenv');
const joi=require('joi');
const { joiPassword } = require('joi-password');
const bcrypt= require('bcrypt');
const verify= require('./routes/verifyToken')
dotenv.config();

//import routes
const authRoute=require('./routes/auth');

app.use('/api/user',authRoute)



app.get('/login',verify,(req,res)=>{
    mysqlconnection.query('select * from login_info',(error,results)=>{
        if(error) return res.send(error)
        res.send(results)
    })
})


app.listen(3000,()=> console.log('server running on 3000'))