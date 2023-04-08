const mongoose=require("mongoose");

// ReserveModel Is Used to Create Collection of name "reserve" in Database and allows to peform operation such as find, findByID&Update etc;
const reserveSchema=mongoose.Schema({
    matrix:Array,
    booked:Number
})

const ReserveModel=mongoose.model("reserve",reserveSchema);

module.exports={
    ReserveModel
}