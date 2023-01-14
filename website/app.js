/* Global Variables */
// api var
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=d0908eba7de46c86b9f2703c3c46351e";
const zip = document.getElementById("zip");
// DOM var
const generate = document.getElementById("generate");
const content = document.getElementById("content");

const feeling = document.getElementById("feeling");
const date = document.getElementById("date");
const temp = document.getElementById("temp");

//   "https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}";

// Create a new date instance dynamically with JS
let d = new Date();
const options = { month: "long" };
const month = new Intl.DateTimeFormat("en-US", options).format(d);
/* this method i search mdn documentation to return month string 
link : "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options"
*/
let newDate = d.getDate() + "." + month + "." + d.getFullYear();
console.log(newDate);

generate.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(zip.value);
  getData(baseUrl + zip.value + apiKey).then((data) => {
    postData("http://localhost:7000/post", {
      temp: data.main.temp,
      content: feeling.value,
      date: newDate,
    }).then((data) => {
      date.innerText = `Today : ${data.date}`;
      content.innerText = `Feel like : ${data.content}`;
      temp.innerText = `Temperature : ${data.temp}`;
      return data;
    });
  });
});

const getData = async (url) => {
  const response = await fetch(url);
  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const postData = async (
  url = "http://localhost:7000/post",
  data = {
    temp: "test",
    date: "web test",
    content: "test",
  }
) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// Personal API Key for OpenWeatherMap API

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */

/* Function to GET Web API Data*/

/* Function to POST data */

/* Function to GET Project Data */
