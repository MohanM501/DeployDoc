const mongoose=require("mongoose");

require("dotenv").config()

// Connection is used to connect to MongoDB Atlas;
const connection=mongoose.connect(process.env.MONGO_URL);

// Exporting the connection to use wherever it is required;
module.exports={
    connection
}