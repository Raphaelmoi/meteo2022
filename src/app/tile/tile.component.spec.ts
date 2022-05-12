import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ElementRef } from '@angular/core';
import { WeatherService } from '../weather.service';
import { MapService } from '../map.service';
import { DateService } from '../date.service';
import { UtilsService } from '../utils.service';
import { GeolocalisationService } from '../geolocalisation.service';

import { TileComponent } from './tile.component';

describe('TileComponent', () => {
	let component: TileComponent;
	// let WeatherService: WeatherService | null;
	let fixture: ComponentFixture<TileComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ TileComponent ],
			imports: [ HttpClientTestingModule ],
			providers: [ MapService, DateService, WeatherService, GeolocalisationService, UtilsService ]
		})
			// component = TestBed.inject(TileComponent);
			// WeatherService = TestBed.inject(WeatherService);
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	// it('should return the image url for one weather icon', () => {
	// const comp = new TileComponent()
	// const givenImg = "04d"
	// const when = comp.getWeatherImage("04d")
	// expect(when).toEqual("https://openweathermap.org/img/wn/04d@2x.png");
	// https://openweathermap.org/img/wn/04d@2x.png
	// });
});
