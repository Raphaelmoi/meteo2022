import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { SearchCityComponent } from './search-city/search-city.component';
import { MessagesComponent } from './messages/messages.component';
import { PageDetailComponent } from './page-detail/page-detail.component';
import { HomeComponent } from './home/home.component';
import { TileComponent } from './tile/tile.component';
import { MapComponent } from './map/map.component';

@NgModule({
	declarations: [
		AppComponent,
		SearchCityComponent,
		MessagesComponent,
		PageDetailComponent,
		HomeComponent,
		TileComponent,
		MapComponent
	],
	imports: [ BrowserModule, HttpClientModule, AppRoutingModule ],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
