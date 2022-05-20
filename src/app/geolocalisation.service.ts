import { Injectable } from '@angular/core';
import { WeatherService } from './weather.service';

@Injectable({
	providedIn: 'root'
})
export class GeolocalisationService {
	position_result_id: number = 0;

	constructor(public WeatherService: WeatherService) {
		const lsCityId = localStorage.getItem('position_city_id');
		if (lsCityId) {
			this.position_result_id = parseInt(lsCityId);
		}
		// ask for geolocation or refresh position if its allowed  
		if (navigator.geolocation) {
			setTimeout(() => {
				this.askForGeolocation()
			}, 3000);
		}
	}

	async getLocation() {
		return new Promise((resolve, reject) => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position) => resolve(position));
			} else {
				reject(new Error('Browser does not support geolocation!'));
			}
		});
	}

	setPositionResult(id: number): void {
		this.position_result_id = id;
		localStorage.setItem('position_city_id', this.position_result_id.toString());
	}

	async askForGeolocation(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.getLocation().then((result: any) => {
				if (result && result.coords && result.coords.latitude) {
					this.WeatherService
						.get_W_forCityByPosition(result.coords.latitude, result.coords.longitude)
						.subscribe({
							next: (data: any) => {
								this.setPositionResult(data.id);
								this.WeatherService.storeNewCity(data);
								this.WeatherService.data_loading = false;
							},
							error: (err) => {
								reject(new Error("Can't get location"));
							},
							complete: () => {
								this.WeatherService.data_loading = false;
								resolve()
							}
						});
				}
			});
		})
	}
}
