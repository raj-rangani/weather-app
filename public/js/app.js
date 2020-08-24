const searchBtn = document.querySelector('#searchBtn')
const content1 = document.querySelector('h4')
const content2 = document.querySelector('h6')
const input = document.querySelector('input')
const arrow = document.querySelector('.arrow')
const weatherContent = document.querySelector('.weather-content')
const weatherDescription = document.querySelector('.weather-description')
const place1 = document.querySelector('#place1')
const place2 = document.querySelector('#place2')
const desc = document.querySelector('#desc')
const cloud = document.querySelector('#cloud-cover')
const speed = document.querySelector('#wind-speed')
const visibility = document.querySelector('#visibility')
const temperature = document.querySelector('#temperature')
const temperatureFeel = document.querySelector('#temperature-feels-like')
const title = document.querySelector('.weather-title')
const body = document.querySelector('.weather-body')
const error = document.querySelector('#error')

searchBtn.addEventListener('click' , () => {
    searchBtn.classList.add('search-active')
    setTimeout(() => {
        input.classList.add('input-active')
        arrow.classList.add('active-arrow')
    }, 1000)
});

arrow.addEventListener('click' , () => {

    searchBtn.classList.add('search-up')
    content1.style = "display: none"
    content2.style = "display: none"
    content1.style = "visibility: hidden"
    content2.style = "visibility: hidden"

    setTimeout(() => {
        weatherContent.classList.add('weather-content-active')
        weatherDescription.style = "display: flex"
    }, 1200)
    
    title.style = 'display: none'
    body.style = 'display: none'
    error.style = 'display: block'
    error.innerHTML = 'Loading ...'
    
    if(!(input.value === '')){
    
        const url = '/weather?address=' + input.value
        fetch(url).then((response) => {
            response.json().then((data)=>{
                if(data.error){
                    title.style = 'display: none'
                    body.style = 'display: none'
                    console.log(data.error)
                    error.style = 'display: block'
                    error.innerHTML = data.error
                }
                else{
                    error.style = 'display: none'
                    title.style = 'display: block'
                    body.style = 'display: flex'
                    console.log('hello')
                    console.log(data)
                    const locations = data.location
                    const location = locations.split(',')
                    const last = location.length-1

                    // for location
                    if(location.length > 0 && location.length < 2) {
                        place1.innerHTML = location[last]
                    }

                    if(location.length > 1 && location.length < 3) {
                        place1.innerHTML = location[last-1]
                        place2.innerHTML = location[last]
                    }

                    if(location.length >= 3){
                        place1.innerHTML = location[last-2]
                        place2.innerHTML = location[last-1] + location[last]
                    }

                    // for cloud cover
                    if(data.cloudCover > 70 && data.cloudCover < 100) {
                        desc.innerHTML = "Mostly Cloudy"
                    }

                    else if(data.cloudCover < 70 && data.cloudCover > 50) {
                        desc.innerHTML = "Cloudy"
                    }

                    else if(data.cloudCover < 50 && data.cloudCover > 30){
                        desc.innerHTML = "Partial cloudy"
                    }

                    else {
                        desc.innerHTML = "Clear"
                    }

                    cloud.innerHTML = data.cloudCover + " %"
                    speed.innerHTML = data.wind
                    visibility.innerHTML = data.visibility + " KM"
                    temperature.innerHTML = data.temperature
                    temperatureFeel.innerHTML = data.feelsLikeTemperature    
                }
            })
        })
    }
    else {
        title.style = 'display: none'
        body.style = 'display: none'
        error.style = 'display: block'
        error.innerHTML = 'Please Enter a loction'
    }
})