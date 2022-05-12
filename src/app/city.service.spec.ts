import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { CityService } from './city.service';

describe('CityService', () => {
	let service: CityService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ]
		});
		service = TestBed.inject(CityService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
