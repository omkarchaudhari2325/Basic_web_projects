const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");
let target = "Satara";
const button = document.querySelector(".my-loc");
const API_KEY = "20d58ca99b71e4296f48ff782f6e5052";
// dateField.innerHTML = "This the time when you should understand how should you treat your customers and not it is the time when all working words will act just wati and watch"
const fetchData = async (target) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${target}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    // console.log(data.main.temp)
    const {
      main: { temp },
      name,
      weather: [description],
    } = data;
    //   console.log(description.description)
    const icon = data.weather[0].icon;
    //   console.log(data.weather[0].icon)
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    updateDom(temp.toFixed(0), name, iconUrl, description.description);
    // console.log(data)
    //   console.log(data);
  } catch (err) {
    alert("No data found");
  }
};

function updateDom(temperature, city, emoji, text) {
  temperatureField.innerText = (temperature + `°C`).toUpperCase();
  cityField.innerText = city;
  emojiField.src = emoji;
  weatherField.innerText = text.toUpperCase();
}
fetchData(target);
const search = (e) => {
  e.preventDefault();
  target = searchField.value;
  fetchData(target);
  // console.log(target)
};
form.addEventListener("submit", search);

function getfromSessionStorage() {
  const localCoordinates = sessionStorage.getItem("user-coordinates");
  if(!localCoordinates) {
      //agar local coordinates nahi mile
      console.log("Save the coordinates first");
    fetchData(target);
  }
  else {
      const coordinates = JSON.parse(localCoordinates);
      fetchUserWeatherInfo(coordinates);
  }

}

async function fetchUserWeatherInfo(coordinates){
  const {lat,lon} = coordinates;
  try{
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const  data = await response.json();
    renderWeatherInfo(data);
    displayDate();
  }
  catch(err){
    console.log(err);
  }
}


function renderWeatherInfo(data) {
  //fistly, we have to fethc the elements
try{
  console.log(data);
  const {
    main: { temp },
    name,
    weather: [description],
  } = data;
  //   console.log(description.description)
  const icon = data.weather[0].icon;
  //   console.log(data.weather[0].icon)
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  updateDom(temp.toFixed(0), name, iconUrl, description.description);

}
catch(err){
  console.log(err);
}

}
function getLocation() {
  if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  }
  else {
      //HW - show an alert for no gelolocation support available
  }
}

function showPosition(position) {
  console.log(position)
  const userCoordinates = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
  }

  sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
  fetchUserWeatherInfo(userCoordinates);

}

button.addEventListener("click", getLocation);

const displayDate = ()=>{
  getDate()
}

const getDate = async ()=>{
  try{
    let today = await new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let hours = today.getHours().toLocaleString([], { hour12: true});
    hours = hours % 12
    console.log(hours)
    let time = hours + " : " + today.getMinutes() + " ";

// console.log(time)

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = weekday[today.getDay()];
    todayDate = time + "- " + day +" "+ yyyy + '-' + dd + '-' + mm;
    // console.log(todayDate)
    updateDate(todayDate);
    // console.log(todayDate)
  }
  catch(err){
    console.log(err);
  }
}
const updateDate = (date)=>{
  dateField.innerText = date;
  console.log(date)

}
displayDate();
