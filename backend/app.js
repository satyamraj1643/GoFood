require("dotenv").config();
const express = require('express');
const { dbconnect } = require('./database/db.js');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT;
dbconnect();

const allowedOrigins = ['https://gofood-wq3s.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // if your API uses credentials
  exposedHeaders: ['custom-header1', 'custom-header2'], // specify your custom headers
}));

app.get('/', (req, res) => {
  res.send("Hello peeps");
});

app.use(express.json());
app.use('/api/createuser', require('./routes/createUser.js'));
app.use('/api/loginuser', require('./routes/logInUser.js'));
app.use('/api/fetchitems', require('./routes/fetchItems.js'));
app.use('/api/fetchcategory', require('./routes/fetchCategory.js'));

app.listen(PORT, () => {
  console.log("App started on Port: ", PORT);
});
