import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  LESSONS_FEATURE_KEY,
  BikesState,
  BikesPartialState,
  bikeAdapter
} from './bikes.reducer';

// Lookup the 'Bikes' feature state managed by NgRx
export const getBikesState = createFeatureSelector<
  BikesPartialState,
  BikesState
>(LESSONS_FEATURE_KEY);

const { selectAll, selectEntities } = bikeAdapter.getSelectors();

export const getBikesLoaded = createSelector(
  getBikesState,
  (state: BikesState) => state.loaded
);

export const getBikesError = createSelector(
  getBikesState,
  (state: BikesState) => state.error
);

export const getAllBikes = createSelector(
  getBikesState,
  (state: BikesState) => selectAll(state)
);

export const getBikesEntities = createSelector(
  getBikesState,
  (state: BikesState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getBikesState,
  (state: BikesState) => state.selectedId
);

export const getSelectedBike = createSelector(
  getBikesEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);