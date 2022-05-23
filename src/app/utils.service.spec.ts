import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';
import { Weather } from './weather';

describe('UtilsService', () => {
  let service: UtilsService;
  const dummy: Weather = { name_input: "", id: 456, name: "name", dt: 12, main: {}, coord: { lat: 0, lon: 0 }, sys: {}, weather: {}, wind: {} }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#stringForUrl should return pleasent to see and correct formated for url string', () => {
    expect(service.stringForUrl('phrase avec ESPACE 47 éôui')).toBe('phrase-avec-espace-47-eoui');
  });

  it('#getPageLink should return path with Weather Object as argument', () => {
    expect(service.getPageLink(dummy)).toBe('/name?id=456');
    dummy.name_input = "name_input"
    expect(service.getPageLink(dummy)).toBe('/name-input?id=456');
  });

});
