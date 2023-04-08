// This function is used to update the matrix with one's for no_of_seats elements;

const AddSeats=(matrix,no_of_seats)=>{
        
        let count=0;
        for (let i=0;i<12;i++){
               for (let j=0;j<7;j++){
                    if(i===11 && j==3){
                        return matrix;
                    }
                    if(matrix[i][j]==0){
                        if(count===Number(no_of_seats)){
                            return matrix;
                        }else{
                            matrix[i][j]=1;
                            count++;
                        }
                    }
               }
        }
}

module.exports={
    AddSeats
}