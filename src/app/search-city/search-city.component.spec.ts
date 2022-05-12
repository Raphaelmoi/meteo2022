import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { SearchCityComponent } from './search-city.component';
import { WeatherService } from '../weather.service';
import { MessagesService } from '../messages.service';
import { GeolocalisationService } from '../geolocalisation.service';
import { CityService } from '../city.service';

describe('SearchCityComponent', () => {
	let component: SearchCityComponent;
	let fixture: ComponentFixture<SearchCityComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ],
			declarations: [ SearchCityComponent ],
			providers: [ MessagesService, WeatherService, GeolocalisationService, CityService ]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SearchCityComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
