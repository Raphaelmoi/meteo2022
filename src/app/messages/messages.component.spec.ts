import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesComponent } from './messages.component';
import { MessagesService } from '../messages.service';

describe('MessagesComponent', () => {
	let component: MessagesComponent;
	let fixture: ComponentFixture<MessagesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ MessagesComponent ],
			providers: [ MessagesService ]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MessagesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
