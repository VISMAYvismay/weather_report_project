console.log("vismay");

let vismayform = document.querySelector('form');

let textareavismay = document.getElementById("myTextarea");

function addText(vismay) {
    textareavismay.value +=(vismay);
}

function removeText() {
    textareavismay.value = "";
}

function fetchdata(city) {
    fetch(`/weather?place=${encodeURIComponent(city)}`).then((bing) => {
        return bing.json();
    }).then((lawda) => {
        removeText();
        if(lawda.error){
            addText(`error: ${lawda.error}`)
        }
        else{
            addText(`location: ${lawda.location} \ntemperature: ${lawda.temperature} \nweather_description: ${lawda.weather_description}`)
        }
    })
}

vismayform.addEventListener('submit', (e) => {
    e.preventDefault();
    const tt=e.target.elements.fname.value;
    fetchdata(tt);
})



