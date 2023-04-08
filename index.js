// Importing using require keyword (by common.js method)
const express=require('express');
const cors=require("cors");
const { connection } = require('./Configue/db');
const { getSeatsRouter } = require('./Routes/getseats.route');
const { updateSeatsRouter } = require('./Routes/updateSeats.route');
const { Validator } = require('./Middleware/Validator');
const { OverFlow } = require('./Middleware/OverFlow');
const swaggerJSDoc=require('swagger-jsdoc');
const swaggerUI=require('swagger-ui-express');
require("dotenv").config()

const app=express();
const port=process.env.PORT || 8080 ;


const swaggerOptions={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Train Reservation System API',
            version:'1.0.0',
            description:'Booking Api for reserving seats',
            contact:{
                name:"Mohan M",
                url:"https://mohan501@github.io",
                email:"mohananna501@gmail.com"
            },
            servers:['http://localhost:3000']
        }
    },
    apis:["index.js"]
}

const swaggerDocs=swaggerJSDoc(swaggerOptions);

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));

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


/**
 * @swagger
 * definitions:
 *  reserve:
 *   type: object
 *   properties:
 *    no_of_seats:
 *     type: number
 *     description: number represents no of seats to be booked
 *     example: 5
 */

/**
 * @swagger
 * /update/seats:
 *  patch:
 *   summary: posts no_of_seats 
 *   description: updates no_of_seats in matrix
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/reserve'
 *   responses:
 *    200:
 *     description: user resource is updated
 *    201:
 *     description: matrix is created
 *    400:
 *     description: failure in updating
 */

/**
 * @swagger
 * /seats:
 *  get:
 *   summary: get matrix and booked value
 *   description: get matrix values and booked value
 *   responses:
 *    200:
 *     description: success
 *    400:
 *     description: error
 */


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