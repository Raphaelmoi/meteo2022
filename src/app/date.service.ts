import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DateService {
	constructor() {}

	getHour(d: number): string {
		return new Date(d * 1000)
			.toLocaleString('fr-FR', {
				hour: '2-digit',
				minute: '2-digit',
				hour12: false
			})
			.split(':')
			.join('h');
	}
	getDay(d: number): string {
		return new Date(d * 1000).toLocaleString('fr-FR', {
			weekday: 'short',
			month: 'long',
			day: 'numeric'
		});
	}

	getDayWord(date: number): string {
		return new Date(date * 1000).toLocaleString('fr-FR', {
			weekday: 'long'
		});
	}
}
