/* Global Variables */

//Async function
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
             return newData
    } catch(error) {
        console.log("error", error);
    // appropriately handle the error
    }
}
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=cd0e28e017a624cc417ceca857d03fa4';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction)
/* Function called by event listener */
function performAction(e){
    const zipCode = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    if (zipCode){
        getTemp(baseURL, zipCode, apiKey)
        .then(function(data){
            console.log(data.main.temp);
            /* Function to POST data */
            postData('/postInfo', {theDate: newDate, theTemp: data.main.temp, theFeeling: feeling});
        })
        .then(
            function() {updateUI()}
        )
    } else {
        alert("Please Fill All Required Field");
        return false;
    }
    
}

/* Function to GET Web API Data*/
const getTemp = async (baseURL, zip, key) => {
    const res = await fetch(baseURL+zip+key);
    try {
        const data = await res.json();
        console.log('Data after calling API :')
        console.log(data);
        return data;
    } catch(error) {
        console.log('error', error);
    }
}


/* Function to GET Project Data */
const updateUI = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log('All data is :');
        console.log(allData);
        document.getElementById('date').innerHTML = allData.theDate;
        document.getElementById('temp').innerHTML = allData.theTemp;
        document.getElementById('content').innerHTML = allData.theFeeling;
    } catch(error) {
        console.log('Error', error);
    }
}