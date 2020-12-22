import { Component, OnInit } from '@angular/core';
import { faSun, faMoon, faCloud } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
export class WeatherWidgetComponent implements OnInit {
  faSun = faSun;
  faMoon =faMoon;
  faCloud = faCloud;
  weatherData:any;
  constructor() { }

  ngOnInit(): void {
    this.weatherData = {
      main: {},
      isDay:false
    };
    this.getWeatherData();
    console.log(this.weatherData);
  }

  getWeatherData(){
    fetch('https://api.openweathermap.org/data/2.5/forecast/hourly?q=Durdat-Larequille&appid=eab921258d01ba9de738a1a638a9aec5')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
  }

  setWeatherData(data){
    this.weatherData = data;
    let sunsetTime = new Date(this.weatherData.sys.sunset * 1000);
    console.log('Before toLocaleDateString:', sunsetTime);

    // Donne une date sous format standard ( 13/09/2019 )
    this.weatherData.sunset_time = sunsetTime.toLocaleDateString()
    console.log('After toLocaleDateString:', this.weatherData.sunset_time);
    let currentDate = new Date();

    // Determine si il fait jour ou nuit actuellement
    this.weatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());

    // Calcul la temperature en Celcius en nombre entier 
    this.weatherData.temp_celcius = (this.weatherData.main.temp - 273.15).toFixed(0);
    this.weatherData.temp_min = (this.weatherData.main.temp_min - 273.15).toFixed(0);
    this.weatherData.temp_max = (this.weatherData.main.temp_max - 273.15).toFixed(0);
    this.weatherData.temp_feels_like = (this.weatherData.main.feels_like - 273.15).toFixed(0);
  }

}
