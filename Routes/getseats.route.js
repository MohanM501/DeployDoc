const express=require("express");
const { ReserveModel } = require("../Models/Reserve.Model");

const getSeatsRouter=express.Router();

getSeatsRouter.get("/",async(req,res)=>{
    try {
        // To get seats information from Database(DB) using mongoose Model
        const seats=await ReserveModel.find();
        res.status(200).send({"message":seats});
    } catch (error) {
        // To handle Errors if something goes wrong with code inside try block;
        console.log(error,"error in get request");
        res.status(400).send({"message":"Error in GET seats Request"});
    }
    
})

module.exports={
    getSeatsRouter
}