import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

function map(project) {
  return new Observable(observer => {
    const sub = this.subscribe({
      next: value => observer.next(project(value)),
      error: err => observer.error(error),
      complete: () => observer.complete(),
    });
  });
}

Observable.prototype.map = map;

const source$ = Observable.interval(100);
const result$ = source$.map(x => x * 2);

const sub = result$.subscribe(
  console.log,
  error => console.log('catch', error),
  () => console.log('complete')
);

setTimeout(() => {
  sub.unsubscribe();
}, 500);


