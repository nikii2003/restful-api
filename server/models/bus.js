import { Schema } from "mongoose";

const busSchema = new Schema ({
    type :{
        type : String,
        required : true,
    },
    busNo :{
        type : Number,
        required : true,
        default : "1"
    },
   ticket :{
    type : String,
    required : true ,
    
   }

})