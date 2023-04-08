// Importing using require keyword (by common.js method)
const express=require('express');
const cors=require("cors");
const { connection } = require('./Configue/db');
const { getSeatsRouter } = require('./Routes/getseats.route');
const { updateSeatsRouter } = require('./Routes/updateSeats.route');
const { Validator } = require('./Middleware/Validator');
const { OverFlow } = require('./Middleware/OverFlow');
require("dotenv").config()

const app=express();
const port=process.env.PORT || 8080 ;

// Inbuilt middleware from express to parse incoming JSON data.
app.use(express.json());

// cors allows access to restricted resources outside the domain.
app.use(cors({
    origin:"*"
}))
// Just for API Welcome
app.get("/",(req,res)=>{
    res.send({"message":"Hi !, Warm welcome to book Train seats"})
})

//<-------- All Routes --------------->

// to get all the seats booked information;
app.use("/seats",getSeatsRouter);
// for adding/updating the seats in database along with middlewares Validator & Overflow to handle edge cases 
app.use("/update",Validator,OverFlow,updateSeatsRouter);

// <-------- Listening to port ------------->
app.listen(port, async()=>{
    try {
        await connection
        console.log("Connected to DB successfully")
    } catch (error) {
        console.log(error,"err");
        console.log("Failed to Connect to DB")
    }
    console.log(`listening on PORT ${port}`)
})