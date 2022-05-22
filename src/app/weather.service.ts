import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MessagesService } from './messages.service';
import { Weather } from './weather';
import { Observable, timeout } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class WeatherService {
	apiKey: string = '8c63136abbb30e6383947cb5a7dbc58d';
	weather_data: Weather[] = [];
	duration_before_refreshing_data: number = 60000 * 1; // 1 minute
	localStorageName: string = 'citiesFull';
	data_loading: boolean = false;
	api_base: string = 'https://api.openweathermap.org/data/2.5/'
	constructor(private http: HttpClient, private messagesService: MessagesService) { }

	getFlag(country: string): string {
		return 'https://flagcdn.com/16x12/' + country.toLowerCase() + '.png';
	}
	getWeatherIcon(icon: string, size: number = 4) {
		return 'https://openweathermap.org/img/wn/' + icon + '@' + size + 'x.png';
	}
	getUrl(type: string, query: string) {
		return `${this.api_base}${type}?appid=${this.apiKey}&units=metric&&lang=fr&${query}`;
	}
	get_W_forCityByName(city: string): Observable<Object> {
		this.data_loading = true;
		let base = this.getUrl('weather', 'q=' + city)
		return this.http.get(base);
	}
	get_W_forCityByPosition(latitude: number, longitude: number) {
		this.data_loading = true;
		let base = this.getUrl('weather', `lat=${latitude}&lon=${longitude}`)
		return this.http.get(base);
	}
	get_W_forCityById(id: number) {
		this.data_loading = true;
		let base = this.getUrl('weather', `id=${id}`)
		return this.http.get(base);
	}
	get_F_forCityById(id: number) {
		this.data_loading = true;
		let base = this.getUrl('forecast', `id=${id}`)
		return this.http.get(base);
	}
	getCities() {
		this.weather_data = this.getLocalStorageCities();
		if (this.weather_data.length && this.isExpired(this.weather_data[this.weather_data.length - 1].dt)) {
			this.data_loading = true;
			this.getCitiesWeather();
		}
	}
	getCitiesWeather() {
		this.weather_data.forEach((el) => {
			const inputRef: string = el.name_input;
			this.get_W_forCityByPosition(el.coord.lat, el.coord.lon).subscribe({
				next: (data: any) => {
					this.storeNewCity(data, inputRef);
				},
				error: (err) => {
					console.dir(err);
					this.data_loading = false;
				},
				complete: () => {
					this.data_loading = false;
				}
			});
		});
	}
	storeNewCity(weather: Weather, inputPlace: string = ''): void {
		if (inputPlace) {
			weather.name_input = inputPlace;
		}
		if (weather.name === '') {
			const lat: number = Math.round(weather.coord.lat * 100) / 100
			const lon: number = Math.round(weather.coord.lon * 100) / 100
			weather.name = '_position_' + lat + '_' + lon;
			weather.name_input = lat + ' ' + lon;
			if (weather.id === 0) {
				weather.id = Math.abs(Math.round(lat * lon * 100000))
			}
		}
		const exist = this.existInWeatherData(weather.id, weather.coord.lat, weather.coord.lon);
		if (exist !== -1) {
			this.weather_data[exist] = weather;
		} else {
			this.weather_data.unshift(weather);
		}
		this.setLocalStorageCities();
	}
	setLocalStorageCities() {
		localStorage.setItem(this.localStorageName, JSON.stringify(this.weather_data));
	}
	getLocalStorageCities(): Weather[] {
		let t: Weather[];
		try {
			let b = localStorage.getItem(this.localStorageName);
			if (!b) {
				throw 'empty localstorage';
			}
			t = JSON.parse(b);
			if (!t || !t.length) {
				throw 'probleme with parse';
			}
		} catch (error) {
			localStorage.removeItem(this.localStorageName);
			return [];
		}
		return t;
	}
	existInWeatherData(id: number, lat: number = 0, lon: number = 0): number {
		return this.weather_data.findIndex(
			(el) => (el.coord.lon === lon && el.coord.lat === lat) || el.id === id
		);
	}
	isExpired(data_dt: number): Boolean {
		const weatherdataAge = Date.now() - (data_dt * 1000);
		return weatherdataAge >= this.duration_before_refreshing_data;
	}
	deleteCity(id: number): void {
		if (this.existInWeatherData(id) === -1) {
			return;
		}
		this.weather_data.splice(this.existInWeatherData(id), 1);
		this.setLocalStorageCities();
	}
	deleteAll(): void {
		if (confirm("Attention ! Êtes-vous sûre de vouloir supprimer tous vos favoris ? ")) {
			localStorage.removeItem(this.localStorageName);
			this.weather_data = []
		}
	}
}
