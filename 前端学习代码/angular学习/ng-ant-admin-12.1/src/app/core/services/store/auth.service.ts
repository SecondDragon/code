import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authCodeArray$ = new BehaviorSubject<string[]>([]);

  constructor() {
  }

  parsToken(token: string): string[] {
    const helper = new JwtHelperService();
    try {
      const {rol} = helper.decodeToken(token);
      console.log('权限码' + rol.split(','));
      return rol.split(',');
    } catch (e) {
      return [];
    }

  }

  setAuthCode(authArr: string[]): void {
    this.authCodeArray$.next(authArr);
  }

  getAuthCode(): Observable<string[]> {
    return this.authCodeArray$.asObservable();
  }
}
