import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromBikes from './bikes/bikes.reducer';
import { BikesEffects } from './bikes/bikes.effects';
import { BikesFacade } from './bikes/bikes.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromBikes.LESSONS_FEATURE_KEY,
      fromBikes.bikeReducer
    ),
    EffectsModule.forFeature([BikesEffects]),
  ],
  providers: [BikesFacade],
})
export class CoreStateModule {}
