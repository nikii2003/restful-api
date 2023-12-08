import express from 'express'
import mongoose, { Schema } from 'mongoose'
import dotenv from 'dotenv'
import Booking from './../server/models/booking.js';
import Bus from './models/bus.js';
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

//get api using id
app.get('/api/v3/bookings/:id',async (req,res)=>{
   const {id}=req.params

   const specificbooking = await Booking.findOne({_id:id})

   res.json({
      success : true,
      data : specificbooking,
      message : "specific booking!"
   })

})

//put api using id
app.put('/api/v4/bookings/:id',async (req,res)=>{
   const {customerName,customerEmail,customerInDate,checkOutDate,totalPrice}=req.body
   const {id}=req.params
 await Booking.updateOne({_id:id} , {$set: {
      customerName :customerName ,
      customerEmail :  customerEmail,
      customerInDate : customerInDate,
      checkOutDate:checkOutDate,
      totalPrice : totalPrice 
   }})
   const updateBooking = await Booking.findOne({_id:id})

res.json({
   success : true,
   data : updateBooking,
   message : "updated product !..."
})

})

// delete using id
app.delete('/api/v5/bookings/:id', async ( req, res)=>{
   const {id}=req.params

   const deleteBooking = await Booking.deleteOne({_id : id})

   res.json({
      success : true,
      data : deleteBooking,
      message : "delete Booking successfully..."
   })
   
})

//patch using id only update specific on1 
app.patch('/api/v6/bookings/:id',async (req,res)=>{
const {id}=req.params
const {totalPrice}=req.body
const totalPrice_PRIORITY_MAP ={
   pending :0,
   shipped : 1,
   delivered : 2,
   returned : 3,
   cancelled :4,
   rejected : 5
 }
 const updatedspesific =await Booking.findById(id)
 const currenttotalPrice= Booking.totalPrice
const newPrice = totalPrice_PRIORITY_MAP[totalPrice];
const currentPrice =  totalPrice_PRIORITY_MAP[currenttotalPrice]

if(currentPrice > newPrice){
    return res.json({
      success:false,
      message:"you cannot move"
    })
}
await Booking.updateOne({_id:id}, {$set:{
   totalPrice : totalPrice
}})
  const updatedBookingspecific = await Booking.findOne({ _id: id });

res.json({
   success:true,
   data:updatedBookingspecific,
   message : "update specific one"
})
})

// bus post api
app.post( '/api/v1/bus', async (req,res)=>{
const {type,busNo,ticket,time,busseatsAvail}=req.body

const Buses = new Bus ({

   type,
   busNo,
   ticket,
   time,
   busseatsAvail
})
const savebusinfo = await Buses.save()

res.json({
   success :  true,
   data : savebusinfo,
   message :"Bus information added successfully !"
})

})

app.get('/api/v2/bus',async (req,res)=>{

    const allbusesinfo =  await Bus.find()

    res.json({
      success : true,
      data:allbusesinfo,
      message : "all bus details !"
    })

})
const PORT = process.env.PORT || 5000;

app.listen( PORT,()=>{
console.log("server is connected successfully !")
})


