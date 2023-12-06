import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Booking from './../server/models/booking.js';
dotenv.config();

const app= express()

app.use(express.json());

const connectDB =  async ()=>{
 const conn = await mongoose.connect(process.env.MONGODB_URI)
 if(conn){
    console.log("mongodb connected successfully !")
 }
}
connectDB();
//post api for booking
app.post('/api/v1/bookings', async (req,res)=>{
const {customerName,customerEmail,customerInDate,checkOutDate,totalPrice}=req.body

const booking = new Booking({
   customerName,
   customerEmail,
   customerInDate,
   checkOutDate,
  totalPrice
})
 const savecustomerBooking = await booking.save();

 res.json({
   success : true,
   data : savecustomerBooking,
   message :"booking detail added !"
 })

})

//get restfull api booking 
app.get('/api/v2/bookings',async (req,res)=>{
   const allBooking = await Booking.find()

   res.json({
      success : true,
      data : allBooking,
      message : " Fetch all Boking detail successfully !"
   })
})
const PORT = process.env.PORT || 5000;

app.listen( PORT,()=>{
console.log("server is connected successfully !")
})


