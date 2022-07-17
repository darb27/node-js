const mysql= require('mysql2');
const dotenv= require('dotenv');

dotenv.config();

const mysqlconnection = mysql.createConnection({
   host: process.env.Host,
   user:process.env.User,
   password:process.env.Passeord,
   database:process.env.Database
});
  mysqlconnection.connect((err)=>{
    if(err) return console.log(err)
    console.log('database connected')
  })

  module.exports= mysqlconnection