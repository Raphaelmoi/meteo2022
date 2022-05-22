import { Component, OnInit, AfterViewInit, SimpleChanges, Input } from '@angular/core';
import { MapService } from '../map.service';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
	constructor(public MapService: MapService) { }
	@Input() tiles_length: number = 0;
	@Input() zoomto: any = {};

	ngAfterViewInit(): void {
		this.MapService.initMap();
		this.MapService.initMarkers();
		this.MapService.mapClic();

		if (this.zoomto && this.zoomto.lat) {
			this.MapService.centerMap(this.zoomto.lat, this.zoomto.lon);
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		if (this.MapService.map) {
			this.MapService.markers.forEach((el) => {
				this.MapService.map.removeLayer(el);
			});
			this.MapService.markers = [];

			setTimeout(() => {
				// attendre le resultat des appels
				// a ameliorer
				this.MapService.initMarkers();
			}, 500);
		}
	}
}
