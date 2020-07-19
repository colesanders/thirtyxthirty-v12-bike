import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { BikesEntity } from './bikes.models';
import { BikesEffects } from './bikes.effects';
import { BikesFacade } from './bikes.facade';

import * as BikesSelectors from './bikes.selectors';
import * as BikesActions from './bikes.actions';
import {
  BIKES_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './bikes.reducer';

interface TestSchema {
  bikes: State;
}

describe('BikesFacade', () => {
  let facade: BikesFacade;
  let store: Store<TestSchema>;
  const createBikesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as BikesEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(BIKES_FEATURE_KEY, reducer),
          EffectsModule.forFeature([BikesEffects]),
        ],
        providers: [BikesFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(BikesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allBikes$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(BikesActions.loadBikes());

        list = await readFirst(facade.allBikes$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadBikesSuccess` to manually update list
     */
    it('allBikes$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allBikes$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          BikesActions.loadBikesSuccess({
            bikes: [createBikesEntity('AAA'), createBikesEntity('BBB')],
          })
        );

        list = await readFirst(facade.allBikes$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
