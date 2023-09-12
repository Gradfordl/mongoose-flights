require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const jsxViewEngine = require("jsx-view-engine");
const mongoose = require("mongoose");
const flights = require("./config/database");
const Flight = require("./models/Flight")

const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connection Error/Success

db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('open', () => console.log('mongo connected!'));
db.on('close', () => console.log('mongo disconnected'));


app.set('view engine', 'jsx')
app.set('views', './views')
app.engine('jsx',jsxViewEngine())

// Middleware
app.use(express.urlencoded({ extended: false }));

//////////////////////////

// Index
app.get('/flights', async (req, res) => {
  try {
    const foundFlights = await Flight.find({});
    console.log(foundFlights);
    res.status(200).render('Index', {
      flights: foundFlights,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// New
app.get('/flights/new', (req, res) => {
  console.log('New controller');
  res.render('New');
});
// Create
app.post('/flights', async (req, res) => {
  try {
   const createdFlight = await Flight.create(req.body)
    res.status(201).redirect('/flights');
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Active on port: ${PORT}`);
});