//our api key to make openweathermap.org api calls
const APIKey = '0ff149e0d223b76a6e7dfbc034fe14c9';


var listOfCities = JSON.parse(localStorage.getItem("cities"));

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


function submitForm() {
    


  let name = document.getElementById("name").value.trim();
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

function getDaData(lat, lon){
  let daData = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

  fetch(daData)
    .then(function(response){
      return response.json();
    })
      .then(function(data){
        console.log(data);
      })




}










const button = document.getElementById("clear-storage-button");
button.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});


//Logic to run when the page initializes
function init() {


}

init();

//how we set the local storage
//localStorage.setItem("cities", JSON.stringify(listOfCities));
