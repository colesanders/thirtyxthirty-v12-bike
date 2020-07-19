import { Bike } from '@thirty/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as BikesActions from './bikes.actions';

export const LESSONS_FEATURE_KEY = 'bike';

export interface BikesState extends EntityState<Bike> {
  selectedId?: string | number; // which Bikes record has been selected
  loaded: boolean; // has the Bikes list been loaded
  error?: string | null; // last known error (if any)
}

export interface BikesPartialState {
  readonly [LESSONS_FEATURE_KEY]: BikesState;
}

export const bikeAdapter: EntityAdapter<Bike> = createEntityAdapter();

export const initialBikesState: BikesState = bikeAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const _bikeReducer = createReducer(
  initialBikesState,
  on(BikesActions.resetBikes, state => bikeAdapter.removeAll(state)),
  on(BikesActions.resetSelectedBike, state => Object.assign({}, state, { selectedId: null })),
  on(BikesActions.selectBike, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  // Load bike
  on(
    BikesActions.loadBikes,
    state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(
    BikesActions.loadBikesSuccess,
    (state, { bikes }) =>
    bikeAdapter.setAll(bikes, { ...state, loaded: true })
  ),
  on(
    BikesActions.loadBikesFailure,
    (state, { error }) => ({
    ...state,
    error
  })),
  // Load bike
  on(
    BikesActions.loadBike,
    state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(
    BikesActions.loadBikeSuccess,
    (state, { bike }) =>
    bikeAdapter.upsertOne(bike, { ...state, loaded: true })
  ),
  on(
    BikesActions.loadBikeFailure,
    (state, { error }) => ({
    ...state,
    error
  })),
  // Add bike
  on(BikesActions.createBikeSuccess, (state, { bike }) =>
    bikeAdapter.addOne(bike, state)
  ),
  on(BikesActions.createBikeFailure, (state, { error }) => ({
    ...state,
    error
  })),
  // Update bike
  on(BikesActions.updateBikeSuccess, (state, { bike }) =>
    bikeAdapter.updateOne({ id: bike.id, changes: bike }, state)
  ),
  on(BikesActions.updateBikeFailure, (state, { error }) => ({
    ...state,
    error
  })),
  // Delete bike
  on(BikesActions.deleteBikeSuccess, (state, { bike }) =>
    bikeAdapter.removeOne(bike.id, state)
  ),
  on(BikesActions.deleteBikeFailure, (state, { error }) => ({
    ...state,
    error
  })),
);

export function bikeReducer(state: BikesState | undefined, action: Action) {
  return _bikeReducer(state, action);
}