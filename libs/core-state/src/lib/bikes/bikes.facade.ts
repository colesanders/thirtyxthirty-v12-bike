import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { select, Store, Action, ActionsSubject } from '@ngrx/store';

import { Bike } from '@thirty/api-interfaces';

import * as BikesActions from './bikes.actions';
import * as fromBikes from './bikes.reducer';
import * as BikesSelectors from './bikes.selectors';

@Injectable({
  providedIn: 'root'
})
export class BikesFacade {
  loaded$ = this.store.pipe(select(BikesSelectors.getBikesLoaded));
  allBikes$ = this.store.pipe(select(BikesSelectors.getAllBikes));
  selectedBike$ = this.store.pipe(select(BikesSelectors.getSelectedBike));

  mutations$ = this.actions$.pipe(
    filter((action: Action) =>
    action.type === BikesActions.createBike({} as any).type ||
    action.type === BikesActions.updateBike({} as any).type ||
    action.type === BikesActions.deleteBike({} as any).type
    )
  );

  constructor(private store: Store, private actions$: ActionsSubject) { }

  selectBike(selectedId: string) {
    this.dispatch(BikesActions.selectBike({ selectedId }));
  }

  resetSelectedBike(){
    this.dispatch(BikesActions.resetSelectedBike());
  }

  loadBikes() {
    this.dispatch(BikesActions.loadBikes());
  }

  loadBike(bikeId: string) {
    this.dispatch(BikesActions.loadBike({ bikeId }));
  }

  createBike(bike: Bike) {
    this.dispatch(BikesActions.createBike({ bike }));
  }

  updateBike(bike: Bike) {
    this.dispatch(BikesActions.updateBike({ bike }));
  }

  deleteBike(bike: Bike) {
    this.dispatch(BikesActions.deleteBike({ bike }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
