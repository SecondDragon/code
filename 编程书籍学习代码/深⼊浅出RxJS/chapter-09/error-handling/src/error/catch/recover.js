import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/repeat';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const throwOnUnluckyNumber = value => {
  if (value === 4) {
    throw new Error('unlucky number 4');
  }

  return value;
};

const source$ = Observable.range(1, 5);
const error$ = source$.map(throwOnUnluckyNumber)
const catch$ = error$.catch((err, caught$) => Observable.of(8).repeat(6));

catch$.subscribe(
  value => console.log('value: ', value),
  err => console.log('error: ', err),
  () => console.log('complete')
);



