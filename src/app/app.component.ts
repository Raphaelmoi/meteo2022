import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { GeolocalisationService } from './geolocalisation.service';

import { Weather } from './weather';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
	title = 'meteo22';

	constructor(public WeatherService: WeatherService, private GeolocalisationService: GeolocalisationService) {}

	ngOnInit(): void {
		if (this.WeatherService.getLocalStorageCities().length) {
			this.WeatherService.getCities();
		} else {
			setTimeout(() => {
				this.askForGeolocalisation();
			}, 1000);
		}
	}

	askForGeolocalisation(): void {
		this.GeolocalisationService.getLocation().then((result: any) => {
			if (result && result.coords && result.coords.latitude) {
				this.WeatherService.get_W_forCityByPosition(result.coords.latitude, result.coords.longitude).subscribe({
					next: (data: any) => {
						this.WeatherService.storeNewCity(data);
					},
					error: (err) => {
						console.dir(err);
						this.WeatherService.data_loading = false;
					},
					complete: () => {
						this.WeatherService.data_loading = false;
						// todo : message pour aller vers la page detail du resultat
					}
				});
			}
		});
	}
}
