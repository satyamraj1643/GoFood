const express = require('express');

const router = express.Router();
const SECRET_KEY = require('./config');
const User = require('../models/User')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const jwtSecret = SECRET_KEY


router.post('/', async (req,res)=>{
    let user ;
    let email = req.body.email;

   
    try{
    user =  await User.findOne({email})
        if(user === null){
            res.json({status: 'notfound'})
            return;
        }
    }
    catch(error){
         console.log("Error ocurred while fetching data.")
         res.json({status: "failure" })
    }

     const passwordFetched = req.body.password;
     const match = await bcrypt.compare(passwordFetched,user.password);

     const data = {
        user: {
            id: user.id,
        }
     }

     const authToken = jwt.sign(data,jwtSecret);

     if(match){
        console.log('Success');
        res.json({status: "success", authToken:authToken})
     }
     else{
        res.json({status:'nomatch'})
     }
})


module.exports = router
    

