// index.js

const path = require("path");
const express = require("express");
const flightsRoutes = require('./server/routes/api/searchFlights')
require('dotenv').config()


const app = express();
const port = process.env.PORT || "8000";

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.get("/", (req, res) => {
  res.status(200).send("Home");
})

app.use('/flights', flightsRoutes)


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
 console.log(err);
   
 res.locals.message = err.message;
 res.locals.error = req.app.get('env') === 'development' ? err : {};
 
 // render the error page
 res.status(err.status || 500);
 res.json('error');
 })

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
})