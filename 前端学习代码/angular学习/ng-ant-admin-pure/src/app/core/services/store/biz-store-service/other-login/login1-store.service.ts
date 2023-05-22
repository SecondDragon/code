import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Login1StoreService {
  private isLogin1OverModel$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  setIsLogin1OverModelStore(type: boolean): void {
    this.isLogin1OverModel$.next(type);
  }

  getIsLogin1OverModelStore(): Observable<boolean> {
    return this.isLogin1OverModel$.asObservable();
  }
}
