const { Schema, model } = require("mongoose");

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DAL', 'LAX', 'SAN', 'SEA']
      },
    arrival: Date
});

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
    airport: {
        type: String,
        enum: ['AUS', 'DAL', 'LAX', 'SAN', 'SEA']
      },
      destinations: [destinationSchema]
  },
);


const Flight = model("Flight", flightSchema);

module.exports = Flight;
