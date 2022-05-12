export interface Weather {
	id: number;
	name: string;
	name_input: string;
	dt: number;
	main: object;
	coord: { lat: number; lon: number };
	sys: object;
	weather: object;
	wind: object;
}
