 //const url = 'mongodb+srv://gofood:satyam%40123A@gofood.ihfz3mr.mongodb.net/GoFood'

const url = process.env.MONGO_URI ||  'mongodb+srv://gofood:satyam%40123A@gofood.ihfz3mr.mongodb.net/GoFood'
module.exports = {
    url
}

 //(replace '@' in thepassword with '%40')