import { Injectable } from '@angular/core';
import { Weather } from './weather';

@Injectable({
	providedIn: 'root'
})
export class UtilsService {
	constructor() {}

	getPageLink(place: Weather): string {
		const path = place.name_input ? place.name_input : place.name;
		return '/' + this.stringForUrl(path) + '?id=' + place.id;
	}

	stringForUrl(val: string): string {
		if (val) {
			return val
				.trim()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '') /*enleve tous les accents*/
				.replace(/[\W]/gi, '-') //enleve TOUS ce qui n'est pas un chiffre ou une lettre ou un  _ et met tous en minuscule
				.replace(/_/g, '-')
				.toLowerCase()
				.replace('--', '-')
				.replace('--', '-')
				.replace('--', '-')
				.replace('--', '-') //repetition de 3 fois la suppression de 2 undescrore se suivant
				.replace(/\-$/, ''); //supprime le dernier -
		} else return '';
	}
}
