const submitBtn = document.getElementById("SubmitBtn")
const cityName = document.getElementById("cityName")
const city_name = document.getElementById("city_name")
const temp_real_val = document.getElementById("temp_real_val")
const temp_status = document.getElementById("temp_status")
const datahide = document.querySelector(".middle_layer")
const currDate = document.getElementById("today_date")

const getCurrentDay = () => {
    var weekday = new Array(7)
    weekday[0] = "Sunday"
    weekday[1] = "Monday"
    weekday[2] = "Tuesday"
    weekday[3] = "Wednesday"
    weekday[4] = "Thursday"
    weekday[5] = "Friday"
    weekday[6] = "Saturday"

    let currentTime = new Date()
    let days = weekday[currentTime.getDay()]
    let day = document.getElementById("day")
    day.innerText = days
}
getCurrentDay()


// current time
const getCurrentTime = () => {
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
    ]
    var now = new Date()
    var month = months[now.getMonth()]
    var date = now.getDate()

    return `${month} ${date} `
}

currDate.innerText = getCurrentTime()


const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerText = "Please write the name before search";
        datahide.classList.add("data_hide")
    }
    else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=f7cad12987b05eee0828fc21385fd946`;
            const response = await fetch(url)
            const data = await response.json()
            const arrData = [data]
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`
            temp_real_val.innerText = arrData[0].main.temp
           

            // condition to check sunny or cloudy
            const tempMood = arrData[0].weather[0].main
            if (tempMood == "Clear") {
                temp_status.innerHTML =
                    " <i class='fas fa-sun' style='color:#eccc68;'></i>"
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML =
                    " <i class='fas fa-cloud' style='color:#f1f2f6;'></i>"
            } else if (tempMood == "Rain") {
                temp_status.innerHTML =
                    " <i class='fas fa-cloud-rain' style='color:#a4b0be;'></i>"
            } else if (tempMood == "Snow") {
                temp_status.innerHTML =
                    " <i class='fas fa-snowflake' style='color:#0097e6;'></i>"
            } else if (tempMood == "Fog") {
                temp_status.innerHTML =
                    " <i class='fas fa-cloud-fog' style='color:#a4b0be;'></i>"
            } else {
                temp_status.innerHTML =
                    " <i class='fas fa-sun' style='color:#eccc68;'></i>"
            }
            
            datahide.classList.remove("data_hide")
        } catch {
            city_name.innerText = "Please entercity name properly"
            datahide.classList.add("data_hide")
        }

    }

}
submitBtn.addEventListener("click", getInfo)