import { Component, OnInit, ElementRef } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from '../messages.service';
import { DateService } from '../date.service';
import { Weather } from '../weather';

@Component({
	selector: 'app-page-detail',
	templateUrl: './page-detail.component.html',
	styleUrls: ['./page-detail.component.css']
})
export class PageDetailComponent implements OnInit {
	// ws_result: Weather | undefined;
	ws_result: Weather | any;
	forecast: any = [];
	t_min: number = 0;
	t_max: number = 0;
	constructor(
		public WeatherService: WeatherService,
		private route: ActivatedRoute,
		private MessagesService: MessagesService,
		public DateService: DateService,
		public element: ElementRef
	) { }
	ngOnInit(): void {
		// const cityParam = this.route.snapshot.paramMap.get('id');
		const id: number = this.route.snapshot.queryParams['id'];

		//todo : verif de l'xistence et sa validité dans le store avant de rappeler
		if (id) {
			this.WeatherService.get_W_forCityById(id).subscribe({
				next: (data: any) => {
					// this.WeatherService.deleteCity(data.id);
					// this.WeatherService.storeNewCity(data);
					this.ws_result = data;
				},
				error: (err) => {
					if (err.error.message === 'city not found') {
						this.MessagesService.add(`La ville n'a pas été trouvée`);
						// to redirect page accueil
					} else console.warn(err.error);
					this.WeatherService.data_loading = false;
				},
				complete: () => {
					this.getForecastForDay();
					this.WeatherService.data_loading = false;
				}
			});
		}
	}
	// getFlag(country: string): string {
	// 	return 'https://flagcdn.com/16x12/' + country.toLowerCase() + '.png';
	// }
	getTileLink(): string {
		return '/' + this.ws_result.name.toLowerCase();
	}
	getForecastForDay(): void {
		this.WeatherService.get_F_forCityById(this.ws_result.id).subscribe({
			next: (data: any) => {
				this.forecast.push(data);
			},
			error: (err) => {
				console.dir(err);
				this.WeatherService.data_loading = false;
			},
			complete: () => {
				this.getMinMaxTemperature();
				this.WeatherService.data_loading = false;
			}
		});
	}
	getMinMaxTemperature(): void {
		if (!this.forecast.length) {
			return;
		}
		let sortedByTemp = [...this.forecast[0].list].sort((a: any, b: any) => b.main.temp - a.main.temp);
		this.t_max = Math.round(sortedByTemp[0].main.temp);
		this.t_min = Math.round(sortedByTemp[sortedByTemp.length - 1].main.temp);
	}
	getGraduationCss(temp: number): string {
		return Math.round(this.t_max - temp) * 5 + 'px';
	}
	onImgError(event: any): void {
		event.onerror = null;
		event.target.style = 'display:none';
	}
	scrollManager(direction: number, event: any) {
		event.preventDefault();
		const move_width: number = Math.round(window.innerWidth * 0.75);

		let h_scroll_position: number = move_width * direction;

		this.element.nativeElement.getElementsByClassName('h_scroller')[0].scrollLeft += h_scroll_position;
	}

	addToFavorite(): void {
		this.WeatherService.storeNewCity(this.ws_result)
	}
	removeFromFavorite(): void {
		this.WeatherService.deleteCity(this.ws_result.id)
	}
	isFavorite(): boolean {
		return this.WeatherService.existInWeatherData(this.ws_result.id) === -1 ? false : true
	}
}
