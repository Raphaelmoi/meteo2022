import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { PageDetailComponent } from './page-detail.component';
import { WeatherService } from '../weather.service';
import { MessagesService } from '../messages.service';

describe('PageDetailComponent', () => {
	let component: PageDetailComponent;
	let fixture: ComponentFixture<PageDetailComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ RouterTestingModule, HttpClientTestingModule ],
			declarations: [ PageDetailComponent ],
			providers: [ WeatherService, MessagesService ]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PageDetailComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
