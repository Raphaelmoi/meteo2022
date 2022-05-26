import { Injectable } from '@angular/core';
import { WeatherService } from './weather.service';

@Injectable({
	providedIn: 'root'
})
export class GeolocalisationService {
	position_result_id: number = 0;

	constructor(public WeatherService: WeatherService) {
		this.getStoredPosition()
		// ask for geolocation or refresh position if its allowed  
		if (navigator.geolocation) {
			setTimeout(() => {
				this.askForGeolocation()
			}, 3000);
		}
	}

	async getLocation(): Promise<GeolocationPosition> {
		// async getLocation(): Promise<any> {
		return new Promise((resolve, reject) => {
			// resolve('ok')
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position) => resolve(position));
			} else {
				reject(new Error('Browser does not support geolocation!'));
			}
		});
	}

	getStoredPosition() {
		const lsCityId = localStorage.getItem('position_city_id');
		if (lsCityId && !isNaN(parseInt(lsCityId))) {
			this.position_result_id = parseInt(lsCityId);
		}
	}
	setPositionResult(id: number): void {
		this.position_result_id = id;
		localStorage.setItem('position_city_id', this.position_result_id.toString());
	}

	async askForGeolocation(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.getLocation().then((result: any) => {
				if (result && result.coords && result.coords.latitude) {
					this.getWeatherForBrowserPosition(result.coords)
					resolve()
				}
				reject(new Error("Can't get location"));

			});
		})
	}

	getWeatherForBrowserPosition(coords: any) {
		this.WeatherService
			.get_W_forCityByPosition(coords.latitude, coords.longitude)
			.subscribe({
				next: (data: any) => {
					this.setPositionResult(data.id);
					this.WeatherService.storeNewCity(data);
				},
				error: (err) => {
					console.log(err);
					this.WeatherService.data_loading = false;
				},
				complete: () => {
					this.WeatherService.data_loading = false;
				}
			});

	}
}
