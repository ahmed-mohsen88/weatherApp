// Setup empty JS object to act as endpoint for all routes
let projectData = {};
const dataArray = [];

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
// Express to run server and routes
// listen to server
const port = 7000;
app.listen(port || 4000, () => {
  console.log("server is running");
  console.log("on port " + port);
});

/* routes */
// Post Route
// ## post
app.post("/post", (req, res) => {
  projectData.temp = req.body.temp;
  projectData.content = req.body.content;
  projectData.date = req.body.date;
  dataArray.push(projectData);
  console.log(dataArray);
  console.log(projectData);
  res.send(projectData);
});
// ## get
app.get("/all", (req, res) => {
  console.log(projectData);
  res.send(projectData);
});

// Callback to debug

// Initialize all route with a callback function

// Callback function to complete GET '/all'
