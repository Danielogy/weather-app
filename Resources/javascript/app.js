window.addEventListener('load', () => {
  let lon = 0;
  let lat = 0;
  const KELVIN = 273;
  const tempDesc = document.querySelector(".temperature-description");
  const location = document.querySelector(".location");
  const temps = document.querySelector(".temperature");
  const temp = document.querySelector(".temperature-value");
  const notificationElement = document.querySelector("notification-header");
  const wIcon = document.getElementById('icon');
  const tempSpan = document.querySelector(".letter span");

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8778e21742df49346834d543a22b492b`;

      fetch(api)
        .then(response =>{
          return response.json();
        })
        .then(data =>{
          console.log(data);
          const name = data.name;
          const country = data.sys.country;
          const temperature = Math.floor(data.main.temp - KELVIN);
          const description = data.weather[0].description;
          const icon = data.weather[0].icon;
          console.log(icon);

          //Formula for Celcius
          let fahr = (temperature * (9 / 5) + 32);

          //set DOM Elements from the api
          tempDesc.textContent = description;
          temp.textContent = temperature;
          location.textContent = name + ", " + country;
          wIcon.src = `./resources/images/${icon}.png`;

          //addEventListener C - F
          temp.addEventListener('click', () => {
            if(tempSpan.textContent === "C"){
              tempSpan.textContent = "F";
              temp.textContent = Math.floor(fahr);
            }else{
              tempSpan.textContent = "C";
              temp.textContent = temperature;
            }
          })
        });
    });
  }else{
    notificationElement.textContent = "ERROR";
  }
});
