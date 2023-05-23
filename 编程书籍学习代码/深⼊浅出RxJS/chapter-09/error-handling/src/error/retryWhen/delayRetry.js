import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/catch';

const throwOnUnluckyNumber = value => {
  if (value === 4) {
    throw new Error('unlucky number 4');
  }

  return value;
};

const source$ = Observable.range(1, 5);
const error$ = source$.map(throwOnUnluckyNumber);
const retry$ = error$.retryWhen(err$ => err$.delay(1000));

retry$.subscribe(
  value => console.log('value: ', value),
  err => console.log('error: ', err),
  () => console.log('complete')
);



