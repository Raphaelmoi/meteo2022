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

  describe('getStoredPosition', () => {
    beforeEach(() => {
      service.position_result_id = 0
    });

    it('do nothing if localStorage position_city_id doesnt exist', () => {
      localStorage.removeItem('position_city_id');
      service.getStoredPosition()
      expect(service.position_result_id).toBe(0);
    });
    it('reject localStorage if it\'s not a valid number', () => {
      localStorage.setItem('position_city_id', JSON.stringify('chaussette'));
      service.getStoredPosition()
      expect(service.position_result_id).toBe(0);
    });
    it('set position_result_id if localStorage is a number', () => {
      localStorage.setItem('position_city_id', JSON.stringify(30));
      service.getStoredPosition()
      expect(service.position_result_id).toBe(30);
    });
  });

  describe('setPositionResult', () => {
    it('set position_result_id with the given ID', () => {
      service.setPositionResult(8)
      expect(service.position_result_id).toBe(8);
    });
    it('set localStorage or replace old value with the given ID', () => {
      service.setPositionResult(9)
      expect(localStorage.getItem('position_city_id')).toBe('9');
    });
  });

  // describe('getWeatherForBrowserPosition', () => {
  //   // (done: DoneFn) => {
  //   //   service.askForGeolocation().then(value => {
  //   //     expect(value).toBe('observable value');
  //   //     done();
  //   //   })
  //   // }

  //   it('manage error', () => { })
  //   it('turn off loading variable when error', () => { })
  //   it('turn off loading variable when finish', () => { })
  //   it('set a new position_result_id', () => { })
  // });


  describe('getLocation', () => {
    it('manage error', () => { })

    it('#getObservableValue should return value from observable',
      (done: DoneFn) => {
        service.getLocation().then(value => {
          console.log(value);
          it('manage ' + value, () => { })

          // expect(value).toBe(typeof GeolocationPosition);
          done();
        })
      })

    it('turn off loading variable when error', () => { })
    it('turn off loading variable when finish', () => { })
    it('set a new position_result_id', () => { })
  });
});
