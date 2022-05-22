import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { GeolocalisationService } from '../geolocalisation.service';
import { Weather } from '../weather';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	coords: any = {};

	constructor(public WeatherService: WeatherService,
		private GeolocalisationService: GeolocalisationService) { }

	ngOnInit(): void { }

	results_positionFirst(): Weather[] {
		return this.WeatherService.weather_data.sort((a, b) => {
			return a.id - b.id;
		});
	}
}
