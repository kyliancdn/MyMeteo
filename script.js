const iconReference = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
}

async function main() {

    const villeNm = document.querySelector('#ville')
    villeNm.contentEditable = true
    //console.log(villeNm.textContent);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${villeNm.textContent}&appid=cd73f70f866d3ff56bb0c172f4df20b1&lang=fr&units=metric`)
         .then(res => res.json())
         .then(data => console.log(data))

    const temperature = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${villeNm.textContent}&appid=cd73f70f866d3ff56bb0c172f4df20b1&lang=fr&units=metric`)
        .then(res => res.json())
        .then(data => Math.round(data.main.temp))
    
            
    const desc = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${villeNm.textContent}&appid=cd73f70f866d3ff56bb0c172f4df20b1&lang=fr&units=metric`)
    .then(res => res.json())
    .then(data => 
        data.weather[0].description)

    const cond = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${villeNm.textContent}&appid=cd73f70f866d3ff56bb0c172f4df20b1&lang=fr&units=metric`)
    .then(res => res.json())
    .then(data => data.weather[0].main)

    

    const ville = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${villeNm.textContent}&appid=cd73f70f866d3ff56bb0c172f4df20b1&lang=fr&units=metric`)
        .then(res => res.json())
        .then(data => data.name)

    console.log(temperature, desc, ville)
    
    document.querySelector('#ville').textContent = ville
    document.querySelector('#temperature').textContent = temperature
    document.querySelector('#conditions').textContent = desc

    document.querySelector('i.wi').className = iconReference[cond]
    
    if (iconReference[cond]) {

        switch (document.querySelector('i.wi').className) {
            case iconReference["Clouds"]:
                document.body.style.background = 'url(img/clouds_Zel.jpg)'
                document.body.style.backgroundSize = 'height: 100vh; width: 100vw;'
                document.body.style.color = 'black'
                break;
                case iconReference["Clear"]:
                    document.body.style.background = 'url(img/clear_Zel.jpg)'
                    document.body.style.color = 'white'
                    break;
                    case iconReference["Rain"]:
                        document.body.style.background = 'url(img/rain_Zel.jpg)'
                        document.body.style.color = 'white'
                        break;
        
            default:
                break;
        }
    }

    villeNm.addEventListener('keydown', (e) => {
        if(e.keyCode === 13){
            e.preventDefault()
            main()
        }
    })
}

main()



