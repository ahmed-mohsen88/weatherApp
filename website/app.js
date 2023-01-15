/* Global Variables */

// api var
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=d0908eba7de46c86b9f2703c3c46351e&units=imperial";

// DOM var addEventListener
const generate = document.getElementById("generate");
const content = document.getElementById("content");

// DOM var to update UI
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const err_message = document.getElementById("err_message");
const app = document.getElementById("app");

// error message function
function err_click(message) {
  const err_message_container = document.getElementById(
    "err_message_container"
  );
  err_message_container.classList.add("err_message_container");
  err_message.style.display = "flex";
  err_message.innerHTML = message;
  app.style.opacity = "0.1";
  const err_button = document.getElementById("err_button");
  err_button?.addEventListener("click", () => {
    err_message_container.classList.remove("err_message_container");
    err_message.innerHTML = "";
    err_message.style.display = "none";
    app.style.opacity = "1";
  });
}

// Create a new date instance dynamically with JS
let d = new Date();
const options = { month: "long" };
const month = new Intl.DateTimeFormat("en-US", options).format(d);
/* this method i search mdn documentation to return month string 
link : "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options"
*/
let newDate = d.getDate() + "." + month + "." + d.getFullYear();

/* Function to GET Web API Data*/
const getData = async (url) => {
  const response = await fetch(url);
  try {
    // Transform into JSON
    const data = await response.json();
    console.log(data);
    if (data.message == "city not found") {
      err_click(`<strong style="width:100%">City not found</strong>
      <button id="err_button" type="button">OK</button>`);
    }
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

/* Function to GET Project Data */
// and update UI
const retrieveData = async (url) => {
  const response = await fetch(url);
  try {
    // Transform into JSON
    const allData = await response.json();
    // update UI most recent Entry
    date.innerText = `Today : ${allData.date}`;
    content.innerText = `Feel like : ${allData.content}`;
    temp.innerText = `Temperature : ${Math.round(allData.temp)} degrees`;
    // reset input to empty
    zip.value = "";
    feeling.value = "";
    //   return data
    return allData;
  } catch (error) {
    console.log("error", error);
  }
};

// function chain all get/post requests
function update_Ui() {
  // Event listener to add function to existing HTML DOM element
  generate.addEventListener("click", () => {
    const feeling = document.getElementById("feeling").value;
    const zip = document.getElementById("zip").value;
    if (zip == false) {
      err_click(`<strong style="width:100%">zip input cant be empty</strong>
      <button id="err_button" type="button">OK</button>`);
    } else if (isNaN(parseInt(zip))) {
      err_click(`<strong style="width:100%">zip input must be a number</strong>
      <button id="err_button" type="button">OK</button>`);
    } else {
      /* Function called by event listener */
      getData(baseUrl + zip + apiKey) //get data from weather api
        .then((data) => {
          //post data to local server
          postData("/post", {
            temp: data.main.temp,
            date: newDate,
            content: feeling,
          }).then(() => {
            //get all data from local server after being updated from weather api
            retrieveData("/all");
          });
        });
    }
  });
}

// click event function call
update_Ui();
