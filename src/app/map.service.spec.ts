import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { MapService } from './map.service';
import { WeatherService } from './weather.service';
import { CityService } from './city.service';

describe('MapService', () => {
	let service: MapService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ],
			providers: [ WeatherService, CityService ]
		});
		service = TestBed.inject(MapService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
