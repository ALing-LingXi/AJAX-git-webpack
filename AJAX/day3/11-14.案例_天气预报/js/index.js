/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */
function weather(citycode) {
  myAxios({
    url: "https://hmajax.itheima.net/api/weather",
    params: {
      city: citycode
    }
  }).then(res => {
    const data = res.data
    console.log(data)
    const title = document.querySelector(".title")
    title.innerHTML = `<span class="dateShort">${data.dateShort}</span>
        <span class="calendar">农历&nbsp;
          <span class="dateLunar">${data.dateLunar}</span>
        </span>
    `
    document.querySelector(".area").innerText = data.area
    document.querySelector(".weather-box").innerHTML =
      `<div class="tem-box">
        <span class="temp">
          <span class="temperature">${data.temperature}</span>
          <span>°</span>
        </span>
      </div>
      <div class="climate-box">
        <div class="air">
          <span class="psPm25">${data.psPm25}</span>
          <span class="psPm25Level">${data.psPm25Level}</span>
        </div>
        <ul class="weather-list">
          <li>
            <img src="${data.weatherImg}" class="weatherImg" alt="">
            <span class="weather">${data.weather}</span>
          </li>
          <li class="windDirection">${data.windDirection}</li>
          <li class="windPower">${data.windPower}</li>
        </ul>
      </div>
    `
    const tWeather = data.todayWeather
    console.log(tWeather)
    document.querySelector(".today-weather").innerHTML =
      ` <div class="range-box">
        <span>今天：</span>
        <span class="range">
          <span class="weather">${tWeather.weather}</span>
          <span class="temNight">${tWeather.temNight}</span>
          <span>-</span>
          <span class="temDay">${tWeather.temDay}</span>
          <span>℃</span>
        </span>
      </div>
      <ul class="sun-list">
        <li>
          <span>紫外线</span>
          <span class="ultraviolet">强</span>
        </li>
        <li>
          <span>湿度</span>
          <span class="humidity">${tWeather.humidity}</span>%
        </li>
        <li>
          <span>日出</span>
          <span class="sunriseTime">${tWeather.sunriseTime}</span>
        </li>
        <li>
          <span>日落</span>
          <span class="sunsetTime">${tWeather.sunsetTime}</span>
        </li>
      </ul>
    `
    const dayForecast = data.dayForecast
    console.log(dayForecast)
   const t = dayForecast.map(ele => 
      `<li class="item">
          <div class="date-box">
            <span class="dateFormat">今天</span>
            <span class="date">${ele.date}</span>
          </div>
          <img src="${ele.weatherImg}" alt="" class="weatherImg">
          <span class="weather">${ele.dateFormat}</span>
          <div class="temp">
            <span class="temNight">${ele.temNight}</span>-
            <span class="temDay">${ele.temDay}</span>
            <span>℃</span>
          </div>
          <div class="wind">
            <span class="windDirection">${ele.windDirection}</span>
            <span class="windPower">&lt;${ele.windPower}</span>
          </div>
        </li>`)
    document.querySelector(".week-wrap").innerHTML = t.join("")
  }).catch(err => {
    console.log(err)
  })
}
weather("110100")
// <li class="city-item">北京市</li>
const search = document.querySelector(".search-city")
const searchUl = document.querySelector(".search-list")
search.addEventListener("input",(e)=>{
  console.log(e.target.value)
  myAxios({
    url:"https://hmajax.itheima.net/api/weather/city",
    params:{
      city:e.target.value
    }
  }).then(res=>{
    console.log(res)
    const data = res.data
    console.log(data)
    console.log(data.code)
    searchUl.innerHTML=(data.map(ele=>`<li class="city-item" data-id=${ele.code}>${ele.name}</li>`)).join("")
  })
})

searchUl.addEventListener("click",e=>{
  if(e.target.tagName==="LI"){
    console.log(e.target.dataset.id)
    weather(e.target.dataset.id)
    search.value=""
  }
})