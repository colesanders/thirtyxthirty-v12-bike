import { BikesEntity } from './bikes.models';
import { State, bikesAdapter, initialState } from './bikes.reducer';
import * as BikesSelectors from './bikes.selectors';

describe('Bikes Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getBikesId = (it) => it['id'];
  const createBikesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as BikesEntity);

  let state;

  beforeEach(() => {
    state = {
      bikes: bikesAdapter.addAll(
        [
          createBikesEntity('PRODUCT-AAA'),
          createBikesEntity('PRODUCT-BBB'),
          createBikesEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Bikes Selectors', () => {
    it('getAllBikes() should return the list of Bikes', () => {
      const results = BikesSelectors.getAllBikes(state);
      const selId = getBikesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = BikesSelectors.getSelected(state);
      const selId = getBikesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getBikesLoaded() should return the current 'loaded' status", () => {
      const result = BikesSelectors.getBikesLoaded(state);

      expect(result).toBe(true);
    });

    it("getBikesError() should return the current 'error' state", () => {
      const result = BikesSelectors.getBikesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
