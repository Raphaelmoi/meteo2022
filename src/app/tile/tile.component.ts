import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
import { MapService } from '../map.service';
import { DateService } from '../date.service';
import { UtilsService } from '../utils.service';
import { GeolocalisationService } from '../geolocalisation.service';

@Component({
	selector: 'app-tile',
	templateUrl: './tile.component.html',
	styleUrls: [ './tile.component.css' ]
})
export class TileComponent implements OnInit {
	@Input() place: any = {};
	forecast: any = [];
	t_min: number = 0;
	t_max: number = 0;
	constructor(
		private MapService: MapService,
		public WeatherService: WeatherService,
		public DateService: DateService,
		public UtilsService: UtilsService,
		public GeolocalisationService: GeolocalisationService
	) {}

	ngOnInit(): void {}

	getMinMaxTemperature(): void {
		if (!this.forecast.length) {
			return;
		}
		let sortedByTemp = [ ...this.forecast[0].list ].sort((a: any, b: any) => b.main.temp - a.main.temp);
		this.t_max = Math.round(sortedByTemp[0].main.temp);
		this.t_min = Math.round(sortedByTemp[sortedByTemp.length - 1].main.temp);
	}
	getGraduationCss(temp: number): string {
		return Math.round(this.t_max - temp) + 'px';
	}
	onImgError(event: any): void {
		event.onerror = null;
		event.target.style = 'display:none';
	}
	onDeleteCity(event: any): void {
		event.preventDefault();
		this.WeatherService.deleteCity(this.place.id);
	}
	onCenterTileOnMap(event: any): void {
		event.preventDefault();
		this.MapService.centerMap(this.place.coord.lat, this.place.coord.lon);
		const mapEl = document.getElementById('map');
		if (mapEl) {
			mapEl.scrollIntoView();
		}
	}
}
