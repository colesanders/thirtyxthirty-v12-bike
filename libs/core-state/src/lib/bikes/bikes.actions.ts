import { Bike } from '@thirty/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const resetSelectedBike = createAction('[Bikes] Reset Selected Bike');
export const resetBikes = createAction('[Bikes] Reset Bikes');

// Select Bike
export const selectBike = createAction(
  '[Bikes] Select Bike',
  props<{ selectedId: string }>()
);

// Load Bikes
export const loadBikes = createAction('[Bikes] Load Bikes');

export const loadBikesSuccess = createAction(
  '[Bikes] Load Bikes Success',
  props<{ bikes: Bike[] }>()
);

export const loadBikesFailure = createAction(
  '[Bikes] Load Bikes Failure',
  props<{ error: any }>()
);

// Load Bike
export const loadBike = createAction(
  '[Bikes] Load Bike',
  props<{ bikeId: string }>()
);

export const loadBikeSuccess = createAction(
  '[Bikes] Load Bike Success',
  props<{ bike: Bike }>()
);

export const loadBikeFailure = createAction(
  '[Bikes] Load Bike Failure',
  props<{ error: any }>()
);

// Create Bike
export const createBike = createAction(
  '[Bikes] Create Bike',
  props<{ bike: Bike }>()
);

export const createBikeSuccess = createAction(
  '[Bikes] Create Bike Success',
  props<{ bike: Bike }>()
);

export const createBikeFailure = createAction(
  '[Bikes] Create Bike Failure',
  props<{ error: any }>()
);

// Update Bike
export const updateBike = createAction(
  '[Bikes] Update Bike',
  props<{ bike: Bike }>()
);

export const updateBikeSuccess = createAction(
  '[Bikes] Update Bike Success',
  props<{ bike: Bike }>()
);

export const updateBikeFailure = createAction(
  '[Bikes] Update Bike Failure',
  props<{ error: any }>()
);

// Delete Bike
export const deleteBike = createAction(
  '[Bikes] Delete Bike',
  props<{ bike: Bike }>()
);

export const deleteBikeCancelled = createAction(
  '[Bikes] Delete Bike Cancelled'
);

export const deleteBikeSuccess = createAction(
  '[Bikes] Delete Bike Success',
  props<{ bike: Bike }>()
);

export const deleteBikeFailure = createAction(
  '[Bikes] Delete Bike Failure',
  props<{ error: any }>()
);