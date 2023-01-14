/* Global Variables */

// api var
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=d0908eba7de46c86b9f2703c3c46351e";

// DOM var addeventListner
const generate = document.getElementById("generate");
const content = document.getElementById("content");
const zip = document.getElementById("zip");

// DOM var to update UI
const feeling = document.getElementById("feeling");
const date = document.getElementById("date");
const temp = document.getElementById("temp");

// Create a new date instance dynamically with JS
let d = new Date();
const options = { month: "long" };
const month = new Intl.DateTimeFormat("en-US", options).format(d);
/* this method i search mdn documentation to return month string 
link : "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options"
*/
let newDate = d.getDate() + "." + month + "." + d.getFullYear();
console.log(newDate);

// Event listener to add function to existing HTML DOM element
generate.addEventListener("click", (e) => {
  e.preventDefault();
  /* Function called by event listener */
  getData(baseUrl + zip.value + apiKey).then((data) => {
    postData("http://localhost:7000/post", {
      temp: data.main.temp,
      content: feeling.value,
      date: newDate,
    }).then((allData) => {
      // update UI most recent Entry
      date.innerText = `Today : ${allData.date}`;
      content.innerText = `Feel like : ${allData.content}`;
      temp.innerText = `Temperature : ${Math.round(allData.temp)} degrees`;
      // reset input to empty
      zip.value = "";
      feeling.value = "";
      //   return data
      return allData;
    });
  });
});

/* Function to GET Web API Data*/
/* Function to GET Project Data */
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

/* Function to POST data */
const postData = async (url, data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};
