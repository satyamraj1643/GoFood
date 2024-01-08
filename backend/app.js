require("dotenv").config();
const express = require('express');
const {dbconnect} = require('./database/db.js')
const app = express();
const cors = require('cors');


const PORT = process.env.PORT || 3030;
dbconnect();



app.use((req,res,next)=>{
    res.setHeader("Acess-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    next();
})


// app.use(cors({

//     origin: ["https://gofood-1whq.vercel.app"], 
//     methods: ["POST", "GET"],
//     credentials: true
    
// }));
 //app.use(cors());


app.get('/', (req,res)=>{
    res.send("Hello React! Deployed from vercel.");
})

 app.use(express.json());
 app.use('/api/createuser', require('./routes/createUser.js'));
 app.use('/api/loginuser', require('./routes/logInUser.js') );
 app.use('/api/fetchitems', require('./routes/fetchItems.js'));
 app.use('/api/fetchcategory', require('./routes/fetchCategory.js'));





app.listen(PORT, ()=>{
    console.log("App started on Port: ", PORT );
})









