var searchFormEl = document.querySelector('#search-form');
var errorMessage = document.querySelector('.js-warn');
var searchInputVal = document.querySelector('#search-input') ;


function handleInputChange(event) {
    if(event.target.value) {
        errorMessage.innerHTML = '';
        searchInputVal.classList.remove('input-warn');
    }
}
function handleSearchFormSubmit(event) {
    event.preventDefault() ;
    if (!searchInputVal.value) {
        errorMessage.innerHTML = "Please enter a City";
        searchInputVal.classList.add('input-warn');
        return;
    }
    var queryString = './search-index.html?q=' + searchInputVal.value;

    location.assign(queryString); 
}

searchInputVal.addEventListener('change', handleInputChange);
searchFormEl.addEventListener('submit', handleSearchFormSubmit);


