import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';

const source1 = Observable.timer(0, 1000).map(x => x+'A');
const source2 = Observable.timer(500, 1000).map(x => x+'B');
const merged$= Observable.merge(source1, source2);

merged$.subscribe(
  console.log,
  null,
  () => console.log('complete')
);


