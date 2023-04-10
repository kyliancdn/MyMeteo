const APIkey = 'cd73f70f866d3ff56bb0c172f4df20b1'

const villeNm = document.querySelector('h1')
villeNm.contentEditable = true

villeNm.addEventListener('keydown', (e) => {
    if(e.keyCode === 13) {
        e.preventDefault()
        meteo()
    }
})

function meteo() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${villeNm.textContent}&appid=cd73f70f866d3ff56bb0c172f4df20b1&lang=fr&units=metric`)
        .then(res => res.json())
        .then(data => {
        
            console.log(data)

            const city = data.name
            const condition = data.weather[0].main
            const temperature = Math.round(data.main.temp)
            const description = data.weather[0].description

            console.log(city, condition, temperature, description)
            
            document.querySelector('h1').textContent = city
            document.querySelector('#current .degres').textContent = temperature
            document.querySelector('#current .description').textContent = description

            // APPARITION BACKGROUD ET ICONS

            const icon = document.querySelector('#current i.wi')
            switch (condition) {
                case 'Rain':
                    icon.classList.add('wi-day-rain')
                    document.body.style.background = 'url(img/rain_Zel.jpg)'
                    document.body.style.color = 'white'
                    break;
                case 'Clouds':
                    icon.classList.add('wi-day-cloudy')
                    document.body.style.background = 'url(img/clouds_Zel.jpg)'
                    document.body.style.color = 'black'
                case 'Clear':
                    icon.classList.add('wi-day-sunny')
                    document.body.style.background = 'url(img/clear_Zel.jpg)'
                    document.body.style.color = 'black'
                case 'Snow':
                    icon.classList.add('wi-day-snow')
                    document.body.style.background = 'url(img/rain_Zel.jpg)'
                    document.body.style.color = 'black'
                case 'mist':
                    icon.classList.add('wi-day-fog')
                    document.body.style.background = 'url(img/clouds_Zel.jpg)'
                    document.body.style.color = 'black'
                case 'Drizzle':
                    icon.classList.add('wi-day-sleet')
                    document.body.style.background = 'url(img/clear_Zel.jpg)'
                    document.body.style.color = 'black'
                default:
                    break;
            }

            document.querySelector('#pays').textContent = data.sys.country
    })

    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${villeNm.textContent}&appid=${APIkey}&lang=fr&units=metric`)
        .then(res => res.json())
        .then(data => { 
                console.log(data)
                const container = document.querySelector('section#prediction')
                container.innerHTML = ''

                // APPARITION DES DATAS    

                for(let i = 8; i < data.list.length; i += 8) {
                    
                    const div = document.createElement('div')
                    div.innerHTML = `
                    <h1>Jour suivant</h1>
                    <i class="wi i${i}"></i>
                    <h2>
                        <span class="degres${i}"></span>
                        °C (
                        <span class="description${i}"></span>
                        )
                    </h2>
                    `
                    container.appendChild(div)
                    
                    const condition = data.list[i].weather[0].main
                    // console.log(condition)
                    const temperature = Math.round(data.list[i].main.temp)
                    const description = data.list[i].weather[0].description

                    document.querySelector(`.degres${i}`).textContent = temperature
                    document.querySelector(`.description${i}`).textContent = description

                    

                    const icon = document.querySelector(`i.wi.i${i}`) 
                    switch (condition) {
                        case 'Rain':
                            icon.classList.add('wi-day-rain')
                            break;
                        case 'Clouds':
                            icon.classList.add('wi-day-cloudy')
                        case 'Clear':
                            icon.classList.add('wi-day-sunny')
                        case 'Snow':
                            icon.classList.add('wi-day-snow')
                        case 'mist':
                            icon.classList.add('wi-day-fog')
                        case 'Drizzle':
                            icon.classList.add('wi-day-sleet')
                        default:
                            break;
                    }
                }
                
                //  "DEMAIN", "APRES DEMAIN" :
                document.querySelector('#prediction div:nth-child(1) h1').textContent = 'Demain'
                document.querySelector('#prediction div:nth-child(2) h1').textContent = 'Après-demain'
            })
}

meteo()