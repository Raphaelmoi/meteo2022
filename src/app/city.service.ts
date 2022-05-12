import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class CityService {
	cities_autocomplete: any;

	constructor(private http: HttpClient) {}

	getCities(input: string) {
		if (!input.length) {
			return;
		}
		const base = `https://geo.api.gouv.fr/communes?nom=${input}&fields=departement,centre&boost=population&limit=5`;
		this.http.get(base).subscribe({
			next: (data: any) => {
				this.cities_autocomplete = data;
			},
			error: (err) => {
				console.dir(err);
			},
			complete: () => {}
		});
	}
}
