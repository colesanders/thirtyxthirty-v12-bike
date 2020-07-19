import { Injectable } from '@angular/core';
import { BikeService } from '@thirty/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';
import * as BikesActions from './bikes.actions';
import { Bike } from '@thirty/api-interfaces';

@Injectable()
export class BikesEffects {
  @Effect() loadBikes$ = this.actions$.pipe(
    ofType(BikesActions.loadBikes),
    fetch({
      run: (action) => this.bikeService.all().pipe(
        map((bikes: Bike[]) => BikesActions.loadBikesSuccess({ bikes }))
      ),
      onError: (action, error) => BikesActions.loadBikesFailure({ error })
    })
  );

  @Effect() loadBike$ = this.actions$.pipe(
    ofType(BikesActions.loadBike),
    fetch({
      run: (action) => this.bikeService.byId(action.bikeId).pipe(
        map((bike: Bike) => BikesActions.loadBikeSuccess({ bike }))
      ),
      onError: (action, error) => BikesActions.loadBikeFailure({ error })
    })
  );

  @Effect() createBike$ = this.actions$.pipe(
    ofType(BikesActions.createBike),
    pessimisticUpdate({
      run: (action) => this.bikeService.create(action.bike).pipe(
        map((bike: Bike) => BikesActions.createBikeSuccess({ bike }))
      ),
      onError: (action, error) => BikesActions.createBikeFailure({ error })
    })
  );

  @Effect() updateBike$ = this.actions$.pipe(
    ofType(BikesActions.updateBike),
    pessimisticUpdate({
      run: (action) => this.bikeService.update(action.bike).pipe(
        map((bike: Bike) => 
          BikesActions.updateBikeSuccess({ bike }))
      ),
      onError: (action, error) => BikesActions.updateBikeFailure({ error })
    })
  );

  @Effect() deleteBike$ = this.actions$.pipe(
    ofType(BikesActions.deleteBike),
    pessimisticUpdate({
      run: (action) => this.bikeService.delete(action.bike.id).pipe(
        map((bike: Bike) => BikesActions.deleteBikeSuccess({ bike })),
      ),
      onError: (action, error) => BikesActions.deleteBikeFailure({ error })
    })
  );

  // Effect to refresh the bike after an async operation changes the database
  // Made in order to reduce risk of timing errors between async and sync operations
  // @Effect() refreshOnSucces = this.actions$.pipe(
  //   ofType(BikesActions.deleteBikeSuccess, BikesActions.updateBikeSuccess),
  //   tap(action => {
  //     BikesActions.loadBikes();
  //   })
  // );

  constructor(
    private actions$: Actions,
    private bikeService: BikeService
  ) {}
}