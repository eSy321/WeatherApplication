var searchBtn = document.getElementsByClassName("fas fa-plus-square fa-2x");
var input = document.getElementById("searchBar");
var presentTemerature;
var city = document.getElementById('searchCity');


/*Background change */
const zmianaTla = () => {
    const date = new Date();
    const month = date.getMonth();
    const hour = date.getHours();
    let cssString;

    if (month >= 2 && month < 5 && hour > 6 && hour < 19) {
        cssString = "background-image:url(./images/spring.jpg)";
        document.body.insertAdjacentHTML("beforeend", `<div id="backgroundImage" style="${cssString}"></div>`);
    } else if (month >= 2 && month < 5 && (hour >= 19 || hour <= 6)) {
        cssString = "background-image:url(./images/springNight.jpg)";
        document.body.insertAdjacentHTML("beforeend", `<div id="backgroundImage" style="${cssString}"></div>`);
    } else if (month >= 5 && month < 8 && hour > 5 && hour < 20) {
        cssString = "background-image:url(./images/summer.jpg)";
        document.body.insertAdjacentHTML("beforeend", `<div id="backgroundImage" style="${cssString}"></div>`);
    } else if (month >= 5 && month < 8 && (hour >= 20 || hour <= 5)) {
        cssString = "background-image:url(./images/summerNight.jpg)";
        document.body.insertAdjacentHTML("beforeend", `<div id="backgroundImage" style="${cssString}"></div>`);
    } else if (month >= 9 && month < 11 && hour > 7 && hour < 18) {
        cssString = "background-image:url(./images/autumn.jpg)";
        document.body.insertAdjacentHTML("beforeend", `<div id="backgroundImage" style="${cssString}"></div>`);
    } else if (month >= 9 && month < 11 && (hour >= 18 || hour <= 7)) {
        cssString = "background-image:url(./images/autumnNight.jpg)";
        document.body.insertAdjacentHTML("beforeend", `<div id="backgroundImage" style="${cssString}"></div>`);
    } else if ((month >= 0 && month < 2 || month === 11) && hour > 8 && hour < 16) {
        cssString = "background-image:url(./images/winter.jpg)";
        document.body.insertAdjacentHTML("beforeend", `<div id="backgroundImage" style="${cssString}"></div>`);
    } else if ((month >= 0 && month < 2 || month === 11) && (hour >= 16 || hour <= 8)) {
        cssString = "background-image:url(./images/winterNight.jpg)";
        document.body.insertAdjacentHTML("beforeend", `<div id="backgroundImage" style="${cssString}"></div>`);
    } else {
        cssString = "background-image:url(./images/sunset.jpg)";
        document.body.insertAdjacentHTML("beforeend", `<div id="backgroundImage" style="${cssString}"></div>`);
    }
}
document.addEventListener('load', zmianaTla());

/*animacja SearchBar */
const mouseOn = () => {
    city.style.boxShadow = '0px 0px 15px 3px rgba(0,0,0,0.8)';
    city.style.opacity = '1';
    city.style.height = '40px';
    city.style.width = '305px';
    city.style.transition = '.1s';
}
document.getElementById('searchCity').addEventListener("mouseover", mouseOn);


const mouseOut = () => {
    city.style.boxShadow = 'none';
    city.style.opacity = '0.7';
    city.style.height = '40px';
    city.style.width = '300px';
    city.style.transition = '.1s';
}
document.getElementById('searchCity').addEventListener("mouseout", mouseOut);

document.getElementById('addButton').addEventListener('click', getWeather)
document.getElementById('myForm').addEventListener('keypress', getWeather)

function getWeather(e) {
    if (e.keyCode == 13 || e.type == "click") {
        e.preventDefault();
        if ((document.getElementById("mainDiv").childElementCount + 1) > 9) {
            alert("You can only create nine forecast");
        } else {
            let value = input.value;
            fetch(`https://api.openweathermap.org/data/2.5/forecast/hourly?q=${value},pl&units=metric&appid=bed4e5796874d1288318fc8b245e8d3e`)
                .then((res) => res.json())
                .then((data) => {
                    const object = {
                        cityName: data.city.name,
                        temp: Math.round(data.list[1].main.temp),
                        icon: data.list[1].weather[0].icon,
                        cloudy: data.list[1].clouds.all,
                        humidity: data.list[1].main.humidity,
                        pressure: Math.round(data.list[1].main.pressure),
                        hour1: data.list[2].dt_txt,
                        temp1: Math.round(data.list[2].main.temp),
                        icon1: data.list[2].weather[0].icon,
                        hour2: data.list[3].dt_txt,
                        temp2: Math.round(data.list[3].main.temp),
                        icon2: data.list[3].weather[0].icon,
                        hour3: data.list[4].dt_txt,
                        temp3: Math.round(data.list[4].main.temp),
                        icon3: data.list[4].weather[0].icon,
                        hour4: data.list[5].dt_txt,
                        temp4: Math.round(data.list[5].main.temp),
                        icon4: data.list[5].weather[0].icon,
                        hour5: data.list[6].dt_txt,
                        icon5: data.list[6].weather[0].icon,
                        temp5: Math.round(data.list[6].main.temp),
                        hour6: data.list[7].dt_txt,
                        temp6: Math.round(data.list[7].main.temp),
                        icon6: data.list[7].weather[0].icon
                    }
                    createElement(object);
                })
                .catch((err) => {
                    console.log(err);
                    document.getElementById('myForm').reset();
                    alert('Nie znaleziono miasta', err);
                });
            document.getElementById('myForm').reset();
        }
    } 
};

/* FUNCTIONS */
const inputDown = (value) => {
    const suffix = input.dataset.positioning; //px
    document.documentElement.style.setProperty(`--${input.name}`, value + suffix);
    searchBtn[0].value = "\u21E7";
}
const inputUp = (value) => {
    const suffix = input.dataset.positioning; //px
    document.documentElement.style.setProperty(`--${input.name}`, value + suffix);
    (searchBtn[0].value = "\u21E9");
}

const createElement = (object) => {
    const main = document.getElementById('mainDiv');
    const el = document.createElement("div");
    el.className = "CflexElem";
    let newDiv = '';
    newDiv = `<div class="Cfeatures">
                <div>
                    <p>Temp:</p>
                    <p>${object.temp}°C</p>
                </div>
                <div>
                    <p>Cloudy:</p>
                    <p>${object.cloudy}%</p>
                </div>
                <div>
                    <p>Humidty:</p>
                    <p>${object.humidity}%</p>
                </div>
                <div>
                    <p>Pressure:</p>
                    <p>${object.pressure}hPa</p>
                </div>
            </div>
            <div class = "Cpresent">
                <div class="present_image" style="background-image:url(./images/weather_icons/${object.icon}.png"></div>
                </br>
                <p>${object.cityName}</p>
                <p>${object.temp}°C</p>
            </div>
            <div class="Chours">
                <div>
                    <div class = "hour_image1" style="background-image:url(./images/weather_icons/${object.icon1}.png)"></div>
                    <p>${object.hour1.substr(object.hour1.indexOf(' '),3)}:00</p>
                    <p>${object.temp1}°C</p>
                </div>
                <div>
                    <div class = "hour_image2" style="background-image:url(./images/weather_icons/${object.icon2}.png)"></div>
                    <p>${object.hour2.substr(object.hour1.indexOf(' '),3)}:00</p>
                    <p>${object.temp2}°C</p>
                </div>
                <div>  
                    <div class = "hour_image3" style="background-image:url(./images/weather_icons/${object.icon3}.png)"> </div> 
                    <p>${object.hour3.substr(object.hour1.indexOf(' '),3)}:00</p>
                    <p>${object.temp3}°C</p>
                </div>
                <div>
                    <div class = "hour_image4" style="background-image:url(./images/weather_icons/${object.icon4}.png)"> </div>
                    <p>${object.hour4.substr(object.hour1.indexOf(' '),3)}:00</p>
                    <p>${object.temp4}°C</p>
                </div> 
                <div>
                    <div class = "hour_image5" style="background-image:url(./images/weather_icons/${object.icon5}.png)"></div>
                    <p>${object.hour5.substr(object.hour1.indexOf(' '),3)}:00</p>
                    <p>${object.temp5}°C</p>
                </div> 
                <div>
                    <div class = "hour_image6" style="background-image:url(./images/weather_icons/${object.icon6}.png)"></div>
                    <p>${object.hour6.substr(object.hour1.indexOf(' '),3)}:00</p>
                    <p>${object.temp6}°C</p>
                </div>  
            </div>`;
    el.innerHTML = newDiv;

    //main.appendChild(el);
    main.appendChild(el); //Dodawanie gotowego dziecka, przypisana jest klasa "element" wiec wystarczy tylko obrobic w css i gotowe :)

}

/*Google Places API */
function activatePlacesSearch() {
    var options = {
        types: ['(cities)'],
        componentRestrictions: {
            country: "pl"
        }
    }
    var input = document.getElementById('searchBar');
    var autocomplete = new google.maps.places.Autocomplete(input, options);
};