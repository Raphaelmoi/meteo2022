import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
import { MessagesService } from '../messages.service';
import { GeolocalisationService } from '../geolocalisation.service';
import { UtilsService } from '../utils.service';
import { CityService } from '../city.service';
import { Weather } from '../weather';

@Component({
	selector: 'app-search-city',
	templateUrl: './search-city.component.html',
	styleUrls: ['./search-city.component.css']
})
export class SearchCityComponent implements OnInit {
	city_input: string = '';
	result_focus: number = -1;
	constructor(
		private WeatherService: WeatherService,
		private GeolocalisationService: GeolocalisationService,
		private UtilsService: UtilsService,
		public messagesService: MessagesService,
		public CityService: CityService,
	) { }

	ngOnInit(): void { }

	OnClickForGeolocation(): void {
		this.GeolocalisationService.askForGeolocation().then((res: any) => {
			this.city_input = '';
		})
	}

	search_action(): void {
		this.messagesService.clear();

		if (this.city_input.length < 3) {
			this.messagesService.add('Le nom de ville est trop court');
			return;
		}

		if (this.result_focus !== -1) {
			this.search(this.CityService.cities_autocomplete[this.result_focus]);
		} else {
			this.WeatherService.get_W_forCityByName(this.city_input).subscribe({
				next: (data: any) => {
					this.WeatherService.deleteCity(data.id);
					this.WeatherService.storeNewCity(data, this.city_input);
					this.sendResultMessage(data)
				},
				error: (err) => {
					if (err.error.message === 'city not found') {
						this.messagesService.add(`La ville " ${this.city_input} " n'a pas été trouvée`);
					} else console.warn(err.error);
					this.WeatherService.data_loading = false;
				},
				complete: () => {
					this.city_input = '';
					this.WeatherService.data_loading = false;
				}
			});
		}
	}

	search(place: any) {
		if (place.centre && place.centre.coordinates) {
			this.WeatherService
				.get_W_forCityByPosition(place.centre.coordinates[1], place.centre.coordinates[0])
				.subscribe({
					next: (data: any) => {
						this.WeatherService.deleteCity(data.id);
						this.WeatherService.storeNewCity(data, place.nom);
						this.sendResultMessage(data)
					},
					error: (err) => {
						if (err.error.message === 'city not found') {
							this.messagesService.add(`La ville " ${place.nom} " n'a pas été trouvée`);
						} else console.warn(err.error);
						this.WeatherService.data_loading = false;
					},
					complete: () => {
						this.city_input = '';
						this.WeatherService.data_loading = false;
					}
				});
		}
	}
	onKey(e: any): void {
		if (e.keyCode === 38 && this.CityService.cities_autocomplete) {
			this.setResultFocus(-1);
		} else if (e.keyCode === 40 && this.CityService.cities_autocomplete) {
			this.setResultFocus(1);
		} else if (e.target.value) {
			this.result_focus = -1; //reset
			this.city_input = e.target.value;
			this.CityService.getCities(this.city_input);
		}
	}
	setResultFocus(direction: number): void {
		this.result_focus += direction;
		const resLength: number = this.CityService.cities_autocomplete.length - 1;
		if (direction === 1) {
			this.result_focus = this.result_focus > resLength ? 0 : this.result_focus;
		} else {
			this.result_focus = this.result_focus < 0 ? resLength : this.result_focus;
		}
		this.city_input = this.CityService.cities_autocomplete[this.result_focus].nom;
	}

	sendResultMessage(res: Weather): void {
		this.messagesService.add('<a href="' + this.UtilsService.getPageLink(res) + '" >Résultat trouvé, cliquez ici pour aller au résultat</a>')
	}
}
