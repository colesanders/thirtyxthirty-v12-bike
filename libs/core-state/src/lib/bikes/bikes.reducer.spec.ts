import { BikesEntity } from './bikes.models';
import * as BikesActions from './bikes.actions';
import { State, initialState, reducer } from './bikes.reducer';

describe('Bikes Reducer', () => {
  const createBikesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as BikesEntity);

  beforeEach(() => {});

  describe('valid Bikes actions', () => {
    it('loadBikesSuccess should return set the list of known Bikes', () => {
      const bikes = [
        createBikesEntity('PRODUCT-AAA'),
        createBikesEntity('PRODUCT-zzz'),
      ];
      const action = BikesActions.loadBikesSuccess({ bikes });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
