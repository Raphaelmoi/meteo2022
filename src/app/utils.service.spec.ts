import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';
import { Weather } from './weather';

describe('UtilsService', () => {
  let service: UtilsService;
  let dummy: Weather

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
    dummy = { name_input: "", id: 456, name: "name", dt: 12, main: {}, coord: { lat: 0, lon: 0 }, sys: {}, weather: {}, wind: {} }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('#stringForUrl', () => {
    it('Return pleasent to see and correctly formated string for url', () => {
      expect(service.stringForUrl('phrase avec ESPACE 47 éôui')).toBe('phrase-avec-espace-47-eoui');
    });
  });

  describe('#getPageLink', () => {
    it('return a correct inner link', () => {
      expect(service.getPageLink(dummy)).toBe('/name?id=456');
    });
    it('use input_name instead of name if not null', () => {
      dummy.name_input = "name_input"
      expect(service.getPageLink(dummy)).toBe('/name-input?id=456');
    });
  });
});
