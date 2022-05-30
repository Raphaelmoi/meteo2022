import { TestBed } from '@angular/core/testing';

import { DateService } from './date.service';

describe('DateService', () => {
	let service: DateService;
	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(DateService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('#getHour', () => {
		it(' ":"  doit être remplacé par h', () => {
			const timeExemple = service.getHour(1653896454);
			expect(timeExemple.includes('h')).toBeTruthy();
		});
		it('return hour for a given timestamp', () => {
			const timeExemple = service.getHour(1653896454);
			expect(timeExemple.includes('09h40')).toBeTruthy();
		});
	});

	describe('#getDayWord', () => {
		it('return full dayname in french like lundi or mardi ', () => {
			const timeExemple = service.getDayWord(1653896454);
			expect(timeExemple).toBe('lundi');
		});
	});

	describe('#getDay', () => {
		it('return date by stamp formated like lun. 30 juillet ', () => {
			const timeExemple = service.getDay(1653896454);
			expect(timeExemple).toBe('lun. 30 mai');
		});
	});
});
