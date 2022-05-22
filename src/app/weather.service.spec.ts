import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { WeatherService } from './weather.service';
import { Weather } from './weather';
import { MessagesService } from './messages.service';

describe('WeatherService', () => {
	let service: WeatherService;

	let httpClient: HttpClient;
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [MessagesService, WeatherService]
		});
		//Instantiates HttpClient, HttpTestingController and EmployeeService
		httpClient = TestBed.inject(HttpClient);
		httpTestingController = TestBed.inject(HttpTestingController);
		service = TestBed.inject(WeatherService);
	});
	afterEach(() => {
		httpTestingController.verify(); //Verifies that no requests are outstanding.
	});

	it('#existInWeatherData should return the index of an item by id or coordinates', () => {
		expect(Number.isInteger(service.existInWeatherData(1))).toBeTruthy();
		expect(Number.isInteger(service.existInWeatherData(1, 1))).toBeTruthy();
		expect(Number.isInteger(service.existInWeatherData(1, 1, 1))).toBeTruthy();
	});

	it('#isExpired should return true if data are too old', () => {
		const minute = service.duration_before_refreshing_data * 2
		const tooOldDate = (Date.now() - minute) / 1000
		expect(service.isExpired(tooOldDate)).toBe(true);
	});
	it('#isExpired should return false if data are not too old', () => {
		const minute = service.duration_before_refreshing_data * 2
		const recentEnoughDate = (Date.now() + minute) / 1000
		expect(service.isExpired(recentEnoughDate)).toBe(false);
	})
	it('#getFlag should return a string url from flagcdn API', () => {
		expect(service.getFlag('FR')).toBe('https://flagcdn.com/16x12/fr.png');
	})

	it('#getWeatherIcon should return a string url from openweathermap API displaying the weather icon', () => {
		expect(service.getWeatherIcon('01d')).toBe('https://openweathermap.org/img/wn/01d@4x.png');
		expect(service.getWeatherIcon('01d', 2)).toBe('https://openweathermap.org/img/wn/01d@2x.png');
	})
	it('#getUrl should return a valid string url', () => {
		expect(validURL(service.getUrl('weather', 'q=ma_ville'))).toBe(true);
		expect(validURL(service.getUrl('weather', 'id=1'))).toBe(true);
		expect(validURL(service.getUrl('forecast', 'id=1'))).toBe(true);
	})

	// describe('#get_W_forCityByName', () => {
	// 	let expectedTemps: Weather[];

	// 	beforeEach(() => {
	// 		//Dummy data to be returned by request.
	// 		expectedTemps = [
	// 			{ id: 101, name: 'Cugnaux' },
	// 			{ id: 102, name: 'Arjun' },
	// 		] as Weather[];
	// 	});

	// 	//Test case 1
	// 	it('should return expected employees by calling once', () => {
	// 		// service.get_W_forCityByName('cugnaux').subscribe({
	// 		// 	complete: () => {
	// 		// 		// emps => expect(emps).toEqual(expectedTemps, 'should return expected employees'),
	// 		// 		// 	fail
	// 		// 	}
	// 		// }

	// 		// );

	// 		const req = httpTestingController.expectOne(service.getUrl('weather', 'id=3025478'));
	// 		expect(req.request.method).toEqual('GET');

	// 		req.flush(expectedTemps); //Return expectedTemps
	// 	});

	// 	// //Test case 2
	// 	// it('should be OK returning no employee', () => {
	// 	// 	service.get_W_forCityByName().subscribe(
	// 	// 		emps => expect(emps.length).toEqual(0, 'should have empty employee array'),
	// 	// 		fail
	// 	// 	);

	// 	// 	const req = httpTestingController.expectOne(service.empUrl);
	// 	// 	req.flush([]); //Return empty data
	// 	// });

	// 	// //Test case 3
	// 	// it('should turn 404 error into an empty employee result', () => {
	// 	// 	service.get_W_forCityByName().subscribe(
	// 	// 		emps => expect(emps.length).toEqual(0, 'should return empty employee array'),
	// 	// 		fail
	// 	// 	);

	// 	// 	const req = httpTestingController.expectOne(service.empUrl);

	// 	// 	const msg = '404 error';
	// 	// 	req.flush(msg, { status: 404, statusText: 'Not Found' }); //Return error
	// 	// });

	// 	// //Test case 4
	// 	// it('should return expected employees when called multiple times', () => {
	// 	// 	service.get_W_forCityByName().subscribe();
	// 	// 	service.get_W_forCityByName().subscribe(
	// 	// 		emps => expect(emps).toEqual(expectedTemps, 'should return expected employees'),
	// 	// 		fail
	// 	// 	);

	// 	// 	const requests = httpTestingController.match(service.empUrl);
	// 	// 	expect(requests.length).toEqual(2, 'calls to get_W_forCityByName()');

	// 	// 	requests[0].flush([]); //Return Empty body for first call
	// 	// 	requests[1].flush(expectedTemps); //Return expectedTemps in second call
	// 	// });
	// });
	function validURL(str: string) {
		var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
		return !!pattern.test(str);
	}
});
