//our api key to make openweathermap.org api calls
const APIKey = '0ff149e0d223b76a6e7dfbc034fe14c9';
var dateString = '';


let listOfCities = JSON.parse(localStorage.getItem("cities"));
console.log(listOfCities);

if (listOfCities == null) {
  listOfCities = [];
}



//opens the "Search for a City" form
function openForm() {
  if(document.getElementById("formContainer").style.display === "block"){
    document.getElementById("formContainer").style.display = "none";
  } else
  document.getElementById("formContainer").style.display = "block";

}

//closes the "Search for a city" from
function closeForm() {
  document.getElementById("formContainer").style.display = "none";
}

var count = 0;
function submitForm() {
    
    
  let name = document.getElementById("name").value.trim();

  //create a button with the submit name and append
  let newBtn = document.createElement("button");
  newBtn.innerText = name;
  newBtn.setAttribute('class','btn cityBtn');
  let newDiv = document.createElement("div");
  newDiv.setAttribute('class', 'controlpanelButtons')
  newDiv.setAttribute('id',`newDiv${count}`)
  document.getElementById('nuts').appendChild(newDiv);
  document.getElementById(`newDiv${count}`).appendChild(newBtn);
  newBtn.addEventListener("click", displayToday(name));
  count++;
  getLatLong(name);

}

  //this function grabs the latitude and longitude
  //of the city entered into the form because we need it for our true api call
function getLatLong(name){

  let geoCode = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=${APIKey}`

  fetch(geoCode)
    .then(function(response){
      return response.json();
    })
      .then(function(data){
        
        let lat = data[0].lat;
        let lon = data[0].lon;
        getDaData(lat, lon);
      })
}

//this function retrieves the full data we need using lat and lon coords
function getDaData(lat, lon){
  let daData = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

  fetch(daData)
    .then(function(response){
      return response.json();
    })
      .then(function(data){
        listOfCities.push(data);
        localStorage.setItem("cities", JSON.stringify(listOfCities));

      })


}


function displayToday(name){

  for(let i = 0; i<listOfCities.length; i++){
    if(listOfCities[i].city.name === name){
      dateString = listOfCities[i].list[0].dt_txt
      date = new Date(dateString);
      date = date.toLocaleDateString('default', {month: 'numeric', day: 'numeric', year: 'numeric'})
      document.getElementById('todaycity').innerHTML = `${name} ${date}`;

      //temp is delivered in Kelvin, so let's convert it to F
      let tempK = listOfCities[i].list[0].main.temp;
      let tempF = parseInt(((tempK - 273.15) * (9/5) + 32));
      
      document.getElementById('todaytemp').innerHTML = `Temp: ${tempF}\u00B0F`;

      //print wind speed
      let wind = listOfCities[i].list[0].wind.speed;
      document.getElementById('todaywind').innerHTML = `Wind: ${wind} MPH`;

      //print humidity
      let hum = listOfCities[i].list[0].main.humidity
      document.getElementById('todayhum').innerHTML = `Humidity: ${hum}%`;
      //fetch weather icons
      let iconId = listOfCities[i].list[0].weather[0].icon;
      let iconUrl = `http://openweathermap.org/img/wn/${iconId}.png`;
      let iconImg = document.createElement("img");
      iconImg.src = iconUrl;
      let todaycity = document.getElementById("todaycity");
      todaycity.appendChild(iconImg);


      //now that todays data is displayed, let's call a function to
      //generate the next week schedule
      displayWeek(listOfCities[i]);

    }
  }
}


function displayWeek(city){


  //populate day 1,2,3 and 4

  let j = 1;  
  for(let i = 8; i < 33; i += 8){
    dateString = city.list[i].dt_txt
    date = new Date(dateString);
    date = date.toLocaleDateString('default', {month: 'numeric', day: 'numeric', year: 'numeric'})
    document.getElementById(`DAY${j}`).innerHTML = `<h3>${date}</h3>`;

    //temp is delivered in Kelvin, so let's convert it to F
    let tempK = city.list[i].main.temp;
    let tempF = parseInt(((tempK - 273.15) * (9/5) + 32));
    
    //print wind speed
    let wind = city.list[i].wind.speed;

    //print humidity
    let hum = city.list[i].main.humidity
    document.getElementById(`day${j}`).innerHTML = `Temp: ${tempF}\u00B0F<br>Wind: ${wind} MPH<br>Humidity: ${hum}%`;



    //fetch weather icons
    let iconId = city.list[i].weather[0].icon;
    let iconUrl = `http://openweathermap.org/img/wn/${iconId}.png`;
    let iconImg = document.createElement("img");
    iconImg.src = iconUrl;
    let todaycity = document.getElementById(`DAY${j}`);
    todaycity.appendChild(iconImg);

    j++;
  }

  //populate day 5
    dateString = city.list[39].dt_txt
    date = new Date(dateString);
    date = date.toLocaleDateString('default', {month: 'numeric', day: 'numeric', year: 'numeric'})
    document.getElementById('DAY5').innerHTML = `<h3>${date}</h3>`;

    //temp is delivered in Kelvin, so let's convert it to F
    let tempK = city.list[39].main.temp;
    let tempF = parseInt(((tempK - 273.15) * (9/5) + 32));
    
    //print wind speed
    let wind = city.list[39].wind.speed;

    //print humidity
    let hum = city.list[39].main.humidity
    document.getElementById('day5').innerHTML = `Temp: ${tempF}\u00B0F<br>Wind: ${wind} MPH<br>Humidity: ${hum}%`;

    let iconId = city.list[39].weather[0].icon;
    let iconUrl = `http://openweathermap.org/img/wn/${iconId}.png`;
    let iconImg = document.createElement("img");
    iconImg.src = iconUrl;
    let todaycity = document.getElementById('DAY5');
    todaycity.appendChild(iconImg);
}












//displayToday('Atlanta');







const button = document.getElementById("clear-storage-button");
button.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});


//Logic to run when the page initializes
function init() {


}

init();

