import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeLast';

const source$ = Observable.interval(1000);
const take$ = source$.take(5);
const last3$ = take$.takeLast(3);

last3$.subscribe(
  console.log,
  null,
  () => console.log('complete')
);


