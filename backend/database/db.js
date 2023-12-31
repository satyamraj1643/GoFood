const mongoose = require('mongoose');
const { url } = require('./dburl')

async function dbconnect() {
    try {


        await mongoose.connect(url);
        console.log("Database connected successfully");

        // let fetchedData = await mongoose.connection.db.collection('FoodItems');
        // let data = await  fetchedData.find({}).toArray();
        // console.log(data);


    } catch (error) {
        console.error("An error occurred while connecting to the database:", error);
    }
}

module.exports = {
    dbconnect,

};
