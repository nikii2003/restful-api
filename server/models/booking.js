import { Schema, model } from "mongoose";

const bookingSchema = new Schema ({

    customerName : {
        type : String,
        required : true
    },
   customerEmail :{
    type : String,
    required : true
   } ,
   customerInDate :  {
    type : String,
    required : true
   },
   checkOutDate : {
    type : String,
    required : true
   },
   totalPrice : {
    type : String,
    // enum: ['confirmed', 'pending', 'canceled'],
    default: 'pending',
   }
},{
    timestamps : true
}
)
const Booking = model ('Booking',bookingSchema)

export default Booking