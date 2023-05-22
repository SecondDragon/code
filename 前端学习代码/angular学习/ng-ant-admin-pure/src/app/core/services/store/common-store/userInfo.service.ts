import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


export interface UserInfo {
  userId: number;
  authCode: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private userInfo$ = new BehaviorSubject<UserInfo>({ userId: -1, authCode: [] });

  constructor() {}

  // parsToken(token: string): UserInfo {
  //   // 如果你需要解析token 请执行npm i @auth0/angular-jwt
  //   const helper = new JwtHelperService();
  //   try {
  //     const { rol, userId } = helper.decodeToken(token);
  //     return {
  //       userId,
  //       authCode: rol.split(',')
  //     };
  //   } catch (e) {
  //     return {
  //       userId: -1,
  //       authCode: []
  //     };
  //   }
  // }

  setUserInfo(userInfo: UserInfo): void {
    this.userInfo$.next(userInfo);
  }

  getUserInfo(): Observable<UserInfo> {
    return this.userInfo$.asObservable();
  }
}
