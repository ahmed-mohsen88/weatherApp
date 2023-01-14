/* Global Variables */
const apiKey = "&appid=d0908eba7de46c86b9f2703c3c46351e";
const generate = document.getElementById("generate");
const zip = document.getElementById("zip");
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");
//   "https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

generate.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("do");
  console.log(zip.value);
  getData(baseUrl + zip.value + apiKey).then((data) => {
    console.log("then");
    postData("http://localhost:7000/post", {
      temp: data.main.temp,
      content: newDate,
      date: newDate,
    });
  });
  //   then((data) => {
  //     date.innerText = newDate;
  //     content.innerText = data.temp;
  //     temp.innerText = data.main.temp;
  //   });
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
