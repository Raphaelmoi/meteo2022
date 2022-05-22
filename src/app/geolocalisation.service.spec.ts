import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GeolocalisationService } from './geolocalisation.service';
import { WeatherService } from './weather.service';

describe('GeolocalisationService', () => {
  let service: GeolocalisationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherService],
      imports: [HttpClientTestingModule],

    });
    service = TestBed.inject(GeolocalisationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
