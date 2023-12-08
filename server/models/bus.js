import { Schema, model } from "mongoose";

const busSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    busNo: {
      type: Number,
      required: true,
      default: "1",
    },
    ticket: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    busseatsAvail: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Bus = model("Bus", busSchema);

export default Bus
