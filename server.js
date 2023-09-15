require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const jsxViewEngine = require("jsx-view-engine");
const mongoose = require("mongoose");
const flights = require("./config/database");
const Flight = require("./models/Flight");
const methodOverride = require("method-override");

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
app.use(methodOverride("_method"));

// Index
app.get('/flights', async (req, res) => {
  try {
    const foundFlights = await Flight.find({});
    // console.log(foundFlights);
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

//Update
app.put("/flights/:id", async (req, res) => {
  try {
    const destination = req.body;
    const foundFlight = await Flight.findById(req.params.id);
    console.log(foundFlight);
    foundFlight.destinations.push(destination);
    console.log(foundFlight)
    const updatedFlight = await Flight.findByIdAndUpdate(req.params.id, foundFlight, {new: true})
    res.status(201).redirect("/flights")
  } catch (error) {
    res.status(400).send(error)
  }
})

// Create
app.post('/flights', async (req, res) => {
  try {
   const createdFlight = await Flight.create(req.body)
    res.status(201).redirect('/flights');
  } catch (err) {
    res.status(400).send(err);
  }
});

//Show 
app.get("/flights/:id", async (req, res) => {

  try {
    const foundFlight = await Flight.findById(req.params.id);
    res.status(200).render("Show", {
      flight: foundFlight
    })
  } catch (err) {
    res.status(400).send(err);
  }
  
})

app.get("*", (req, res) => {
  res.redirect("/flights");
});

app.listen(PORT, () => {
  console.log(`Active on port: ${PORT}`);
});