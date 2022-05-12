import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageDetailComponent } from './page-detail/page-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: ':id', component: PageDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
