import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { WeatherService } from './weather.service';
import { GeolocalisationService } from './geolocalisation.service';

describe('AppComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ RouterTestingModule, HttpClientTestingModule ],
			declarations: [ AppComponent ],
			providers: [ WeatherService, GeolocalisationService ]
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have as title 'meteo22'`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app.title).toEqual('meteo22');
	});

	// it('should render title', () => {
	//   const fixture = TestBed.createComponent(AppComponent);
	//   fixture.detectChanges();
	//   const compiled = fixture.nativeElement as HTMLElement;
	//   expect(compiled.querySelector('.content span')?.textContent).toContain('meteo_22 app is running!');
	// });
});
