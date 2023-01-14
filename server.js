// Setup empty JS object to act as endpoint for all routes
const projectData = {};
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
// listen to server
const port = 7000;
app.listen(port || 4000, () => {
  console.log("server is running");
  console.log("on port " + port);
});

/* routes */
// ## post
app.post("/post", (req, res) => {
  console.log(req.body);
  projectData.temp = req.body.temp;
  projectData.content = req.body.content;
  projectData.date = req.body.date;
  dataArray.push(projectData);
  console.log(dataArray);

  // projectData[0] = req.body;
  console.log(projectData);
});
// ## get
app.get("/get", (req, res) => {
  console.log(projectData);
  res.send(projectData);
});

// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes

// Start up an instance of app

/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance

// Initialize the main project folder

// Spin up the server
// Callback to debug

// Initialize all route with a callback function

// Callback function to complete GET '/all'

// Post Route
