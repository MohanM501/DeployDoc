
// This function is used to create Initial state of Booking seats Matrix with zeros;
const InitialSeats=()=>{
    let matrix=[];
    for (let i=0;i<12;i++){
        let arr=[];
        for (let j=0;j<7;j++){
            if(i===11 && j==3){
                break;
            }
            arr.push(0)
        }
        matrix.push(arr);
    }
    return matrix;
}

module.exports={
    InitialSeats
}