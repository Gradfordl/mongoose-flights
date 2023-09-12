const { Schema, model } = require("mongoose");

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ["American", "Southwest", "United"],
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
  },
  departs: {
    type: Date,
    date: {type: Date, default: Date.now() + 3652460*60000}
    },
  },
);

const Flight = model("Flight", flightSchema);

module.exports = Flight;
