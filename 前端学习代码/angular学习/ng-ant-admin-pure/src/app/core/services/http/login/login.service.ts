import { Inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { MENU_TOKEN } from '@config/menu';
import { Menu } from '@core/services/types';
import { BaseHttpService } from '@services/base-http.service';
import { MenusService } from '@services/system/menus.service';

export interface UserLogin {
  name: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(public http: BaseHttpService, @Inject(MENU_TOKEN) public menus: Menu[]) {}

  public login(params: UserLogin): Observable<string> {
    //模拟返回token
    return of('token');
    // 下面的注释为演示调用接口
    // return this.http.post('/login', params, { needSuccessInfo: false });
  }

  public getMenuByUserId(userId: number): Observable<Menu[]> {
    // 延迟两秒发送，模拟从接口获取
    return of(this.menus).pipe(delay(1));
    // return this.http.get(`/sysPermission/menu/${userId}`);
  }
}
