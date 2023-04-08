const { ReserveModel } = require("../Models/Reserve.Model");

// OverFlow is to handle if User is trying to book extra seats than the availabe seats;
const OverFlow=async(req,res,next)=>{
  
    let seats=await ReserveModel.find();
    // This is to check if collection is created in Database or not;
    if(seats.length>0){
        let {booked}=seats[0];
        
        let {no_of_seats}=req.body;
        if(Number(booked)+Number(no_of_seats)>80){
            if(80-(Number(booked))<=0){
                return res.status(200).send({"msg":"No seats available,Please try later"});
            }
            return res.status(200).send({"msg":`Only ${80-(Number(booked))} seats availabe to book`})
        }else{
            next();
        }
    }else{
        next();
    }

}

module.exports={
    OverFlow
}