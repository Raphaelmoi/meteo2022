import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class GeolocalisationService {
	position_result_id: number = 0;
	constructor() {
		const lsCityId = localStorage.getItem('position_city_id');
		if (lsCityId) {
			this.position_result_id = parseInt(lsCityId);
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
}
