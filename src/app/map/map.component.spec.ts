import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './map.component';
import { MapService } from '../map.service';

describe('MapComponent', () => {
	let component: MapComponent;
	let fixture: ComponentFixture<MapComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ],
			declarations: [ MapComponent ],
			providers: [ MapService ]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MapComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
