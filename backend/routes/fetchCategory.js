const express = require('express');
const {mongoose} = require('mongoose')
const router = express.Router();


router.get('/' , async(req,res)=>{
    var fetched_data;

      try{

         fetched_data  = await mongoose.connection.collection('FoodCategory');
          

      }
      catch{
           console.log('An error ocurred while fetching data.');
           res.json({status:'failure'})
      }



      const data = await fetched_data.find().toArray();

      res.json({status:'success', FoodCategory: data});
        
})


module.exports = router;