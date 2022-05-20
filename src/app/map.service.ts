import { Injectable } from '@angular/core';
import { WeatherService } from './weather.service';
import { CityService } from './city.service';
import { UtilsService } from './utils.service';
import { MessagesService } from './messages.service';
import * as L from 'leaflet';

@Injectable({
	providedIn: 'root'
})
export class MapService {
	map: any;
	markers: any[] = [];
	layers: any[] = [
		{ name: 'Température', layer_name: 'temp_new', mapL: {} },
		{ name: 'Précipitations', layer_name: 'precipitation_new', mapL: {} },
		{ name: 'Nuages', layer_name: 'clouds_new', mapL: {} },
		{ name: 'Pression niveau mer', layer_name: 'pressure_new', mapL: {} },
		{ name: 'Vitesse du vent', layer_name: 'wind_new', mapL: {} },
	]
	constructor(public WeatherService: WeatherService, public CityService: CityService, public UtilsService: UtilsService, private MessagesService: MessagesService) { }

	initMap(): void {
		const fondDeCarte2 = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

		this.map = L.map('map').setView([46.67849561533242, 2.4065153392620164], 6);
		L.tileLayer(fondDeCarte2, {
			attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(this.map);
	}

	toggleMapLayer(layer: string): void {
		const fondDeCarte =
			`https://tile.openweathermap.org/map/
				${layer}/{z}/{x}/{y}.png?opacity=1&appid=
				${this.WeatherService.apiKey}`

		const index = this.layers.findIndex((el) => el.layer_name === layer)

		if (index !== -1) {
			console.log(this.layers[index].mapL);

			if (this.layers[index].mapL && this.layers[index].mapL._leaflet_id) {
				this.map.removeLayer(this.layers[index].mapL)
				this.layers[index].mapL = {}
			} else {
				this.layers[index].mapL = L.tileLayer(fondDeCarte)
				this.layers[index].mapL.addTo(this.map);
			}

		}
	}
	deleteMapLayer(layer: string): void {
		const index = this.layers.findIndex((el) => el.name === layer)
		if (index !== -1) {
			this.map.removeLayer(this.layers[index].mapL)
			this.layers[index].mapL = {}
		}
	}

	initMarkers(): void {
		this.WeatherService.weather_data.forEach((element: any) => {
			this.markers.push(
				L.marker([element.coord.lat, element.coord.lon],
					{ icon: this.getIcon(element.weather[0].icon, element.main.temp) })
					.bindPopup(
						`<a href="${this.UtilsService.getPageLink(element)}">
							<img src="${this.WeatherService.getWeatherIcon(element.weather[0].icon, 2)}" alt='' height='100'/>
							<br/>
							${element.name_input || element.name} - ${Math.round(element.main.temp)}° - ${element.weather[0].description} 
						</a>`
					)
					.openPopup()
					.addTo(this.map)
			);
		});
	}

	getIcon(icon: string, temperature: number) {
		// return L.icon({
		// 	iconUrl: this.WeatherService.getWeatherIcon(icon, 2),
		// 	iconSize: [50, 50],
		// 	iconAnchor: [25, 15]
		// 	// iconUrl: 'assets/icones/marker.svg',
		// 	// shadowUrl: 'assets/leaflet/marker-shadow.png',
		// });
		return new L.DivIcon({
			className: 'mapIcon',
			iconSize: [50, 50],
			iconAnchor: [25, 15],
			html:
				'<img class="my-div-image" src="' + this.WeatherService.getWeatherIcon(icon, 2) + '"/>' +
				'<span class="my-div-span">' + Math.round(temperature) + '°</span>'
		})

	}

	mapClic(): void {
		this.map.on('click', (e: any) => {
			if (!confirm('Voulez-vous ajouter ce lieu à vos favoris ?')) {
				return;
			}
			var coord = e.latlng;
			var lat = coord.lat;
			var lng = coord.lng;
			this.WeatherService.get_W_forCityByPosition(lat, lng).subscribe({
				next: (data: any) => {
					this.WeatherService.storeNewCity(data);
				},
				error: (err) => {
					console.dir(err);
					this.WeatherService.data_loading = false;
					this.MessagesService.add('Pas de résultat pour cet endroit.')
				},
				complete: () => {
					this.WeatherService.data_loading = false;
				}
			});
		});
	}

	centerMap(lat: number, lon: number): void {
		if (lat && lon) {
			this.map.flyTo([lat, lon], 10);
		}
	}
}
