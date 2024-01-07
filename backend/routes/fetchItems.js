const express = require('express');
const {mongoose} = require('mongoose')
const router = express.Router();


router.get('/' , async(req,res)=>{
    var fetched_data;

      try{

         fetched_data  = await mongoose.connection.collection('FoodItems');
          

      }
      catch{
           console.log('An error ocurred while fetching data.');
           res.json({status:'failure'})
      }



      const data = await fetched_data.find({}).toArray();

      res.json({status:'success', FoodItems: data});
        
})


module.exports = router;