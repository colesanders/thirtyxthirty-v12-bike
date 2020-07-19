import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CoreStateModule } from '@thirty/core-state';
import { CoreDataModule } from '@thirty/core-data';
import { MaterialModule } from '@thirty/material';
import * as fromBikes from '@thirty/core-state';

import { AppComponent } from './app.component';
import { BikesComponent } from './bike/bike.component';
import { BikeOverviewComponent } from './bike/components/bike-overview/bike-overview.component';
import { BikeDetailComponent } from './bike/components/bike-detail/bike-detail.component';
import { BikeListComponent } from './bike/components/bike-list/bike-list.component';
import { LoginComponent } from './login/login.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'bike', component: BikesComponent},
  { path: 'login', component: LoginComponent},
  { path: '404', component: FourOhFourComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', component: FourOhFourComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    BikesComponent,
    BikeOverviewComponent,
    BikeDetailComponent,
    BikeListComponent,
    LoginComponent,
    FourOhFourComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    RouterModule,
    CoreStateModule,
    CoreDataModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(fromBikes.bikeReducer, {}),
    EffectsModule.forRoot([fromBikes.BikesEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}


