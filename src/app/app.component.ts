import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { GeolocalisationService } from './geolocalisation.service';

import { Weather } from './weather';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'meteo22';

	constructor(public WeatherService: WeatherService, private GeolocalisationService: GeolocalisationService) { }

	ngOnInit(): void {
		if (this.WeatherService.getLocalStorageCities().length) {
			this.WeatherService.getCities();
		}
	}
}
