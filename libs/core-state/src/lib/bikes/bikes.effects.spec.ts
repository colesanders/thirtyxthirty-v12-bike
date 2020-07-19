import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { BikesEffects } from './bikes.effects';
import * as BikesActions from './bikes.actions';

describe('BikesEffects', () => {
  let actions: Observable<any>;
  let effects: BikesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        BikesEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(BikesEffects);
  });

  describe('loadBikes$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: BikesActions.loadBikes() });

      const expected = hot('-a-|', {
        a: BikesActions.loadBikesSuccess({ bikes: [] }),
      });

      expect(effects.loadBikes$).toBeObservable(expected);
    });
  });
});
