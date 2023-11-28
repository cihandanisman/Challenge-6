const cityInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');
const currentWeatherSection = document.getElementById('current-weather');
const forecastSection = document.getElementById('forecast');
const historyList = document.getElementById('history-list');
const btnCls = document.querySelector('.js-btn');
const catchUser = document.getElementById('result-content');
const storageData = localStorage.getItem('searchUser') ? JSON.parse(localStorage.getItem('searchUser')):[]
var errorMessage = document.querySelector('.js-warn');
cityInput.addEventListener('change', handleInputChange);

btnCls.addEventListener('click', async function(event) {
    event.preventDefault();
    if (!cityInput.value) {
        errorMessage.innerHTML = "Please enter a City";
        cityInput.classList.add('input-warn');
        return;
    }
    storageData.push(cityInput.value);
    localStorage.setItem('searchUser', JSON.stringify(storageData));

    const data = await getWeather();
    if (data?.list?.length > 0 ) {
        
        showResult(data);

    }
    showSearchHistory();
});

//const easiestWay = `<p> ${'temp: ' + data.list[0].main.temp} </p> <p> ${'wind: ' + data.list[0].wind.deg} </p> <p> ${'humidity: ' + data.list[0].main.humidity} </p>`//use it

function showResult(data){
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1
    const year = today.getFullYear();
    const date = `(${month}/${day}/${year})`;
    currentWeatherSection.innerHTML = data.city.name + ' ' + date;
    //const pElement = document.createElement('p');
    const pElement = `
    <p>temp: ${data.list[0]?.main?.temp ?? 'N/A'} </p>
    <p>wind: ${data.list[0]?.wind?.speed ?? 'N/A'} </p> 
    <p>humidity: ${data.list[0]?.main?.humidity ?? 'N/A'} </p>`;
    
    currentWeatherSection.innerHTML += pElement;
    
    const newArr = [];
    for (let i = 0; i < data.list.length ; i++) {
        const element = data.list[i];
        if (i % 8 === 0) {
            newArr.push(data.list[i])
            
        }
    }
    showWeather(newArr);
}

function showWeather(data) {
    console.log(data);
}

function showSearchHistory(){
    historyList.innerHTML = '';
    const data = storageData.slice(-10);
    data.reverse()

    for(let i=0; i < data.length; i++ ) {
        const pElement = document.createElement('p');
        pElement.textContent = data[i];
        historyList.appendChild(pElement);
        pElement.classList.add('history');// looks like this
    }
}
function showFutureWeather(newArr) {
    const today1 = new Date();
    const day1 = today1.getDate();
    const month1 = today1.getMonth() + 1
    const year1 = today1.getFullYear();
    const date1 = `(${month1}/${day1}/${year1})`;
    forecastSection.innerHTML = data.city.name + ' ' + date1;
    let p1Element = document.createElement('div');
    p1Element = `
    <p>temp: ${newArr[0]?.main?.temp ?? 'N/A'} </p>
    <p>wind: ${newArr[0]?.wind?.speed ?? 'N/A'} </p> 
    <p>humidity: ${newArr[0]?.main?.humidity ?? 'N/A'} </p>`;
    forecastSection.innerHTML += p1Element;

    //forecastSection.appendChild(p1Element);

    for (let i = 0; i < newArr.length; i++) {
        const p2Element = document.createElement('p');
        p2Element.textContent = newArr[i];
        forecastSection.appendChild(p2Element);
        p2Element.classList.add('forecast'); 
    }
}


function handleInputChange(event) {
    if(event.target.value) {
        errorMessage.innerHTML = '';
        cityInput.classList.remove('input-warn');
    }
}
async function getWeather() {
    const apiKey = '7e3f9428fa18e8d41995ece28023712e';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(apiUrl);
        if(response.ok){

            const rest = await response.json();
            const data = `https://api.openweathermap.org/data/2.5/forecast?lat=${rest.coord.lat}&lon=${rest.coord.lon}&appid=${apiKey}`;
            const rest2 = await fetch(data);
            return await rest2.json();
        }
        return {message:'could not found'}
    } catch (error) {
        console.log('');
        
    }
}
window.addEventListener('load', showSearchHistory);
window.addEventListener('load', async function() {
    
    const searchParams = new URLSearchParams(window.location.search);
    const params = searchParams.get('q');
    cityInput.value = params;
    const data = await getWeather();
    if (data?.list?.length > 0 ) {
        
        showResult(data);
        

    }
});




