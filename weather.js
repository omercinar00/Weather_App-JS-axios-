const form = document.querySelector("section.top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector("span.msg");
const list = document.querySelector(".ajax-section .cities")

// localStorage.setItem("apiKey",EncryptStringAES("06afb21668986bd88a69810c5bfad810"));

form.addEventListener("submit", (e) => {
    e.preventDefault();
    getWeatherDataFromApi();
})

const getWeatherDataFromApi = async() =>{
    // alert("http request gone");
 
    let tokenKey = DecryptStringAES(localStorage.getItem("apiKey"));
    let inputVal = input.value;
    let unitType = "metric";
    // let lang = "tr";
    // let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${tokenKey}&units=${unitType}&lang=${lang}`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${tokenKey}&units=${unitType}`;
    try {
        // const response = await fetch(url).then(response => response.json());
        const response = await axios(url);
        // axios.get(url); == axios(url);
        const { name, main, sys, weather } = response.data;
        
        let iconurl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

        const cittListItems = list.querySelectorAll(".city");
        const cittListItemsArray = Array.from(cittListItems);
        if(cittListItemsArray.length > 0){
            const filteredArray = cittListItemsArray.filter(cityCard => 
                cityCard.querySelector(".city-name span").innerText == name);
                if(filteredArray.length > 0){
                    msg.innerText = `You already know the weather for ${name} Please search for another city 😏`
                    setTimeout(() => {
                        msg.innerText ="";
                    },5000);
                    form.reset();
                    return;
                }
        }
        const createdLi = document.createElement("li");
        createdLi.classList.add("city");
        const createdLiInnerHTML = 
        `   <h2 class="city-name" data-name="${name},${sys.country}">
                <span>${name}</span>
                <sup>${sys.country}</sup>
            </h2>
            <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
            <figure>
                <img class="city-icon" src="${iconurl}">
                <figcaption>${weather[0].description}</figcaption>
            </figure>`;
            createdLi.innerHTML = createdLiInnerHTML;
            list.append(createdLi);
    } 
    catch (error) {
        msg.innerText = error;
        setTimeout(() => {
            msg.innerText ="";
        },5000);
    }
   //! input.value = "";
    form.reset();
} 