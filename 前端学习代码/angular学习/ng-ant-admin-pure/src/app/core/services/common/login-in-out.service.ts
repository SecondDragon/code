import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { TokenKey, TokenPre } from '@config/constant';
import { SimpleReuseStrategy } from '@core/services/common/reuse-strategy';
import { TabService } from '@core/services/common/tab.service';
import { WindowService } from '@core/services/common/window.service';
import { Menu } from '@core/services/types';
import { LoginService } from '@services/login/login.service';
import { MenuStoreService } from '@store/common-store/menu-store.service';
import { UserInfo, UserInfoService } from '@store/common-store/userInfo.service';
import { getDeepReuseStrategyKeyFn } from '@utils/tools';
import { fnFlatDataHasParentToTree } from '@utils/treeTableTools';

/*
 * 退出登录
 * */
@Injectable({
  providedIn: 'root'
})
export class LoginInOutService {
  constructor(
    private activatedRoute: ActivatedRoute,
    private tabService: TabService,
    private loginService: LoginService,
    private router: Router,
    private userInfoService: UserInfoService,
    private menuService: MenuStoreService,
    private windowServe: WindowService
  ) {}

  // 通过用户Id来获取菜单数组
  getMenuByUserId(userId: number): Observable<Menu[]> {
    return this.loginService.getMenuByUserId(userId);
  }

  loginIn(token: string): Promise<void> {
    return new Promise(resolve => {
      // 将 token 持久化缓存，请注意，如果没有缓存，则会在路由守卫中被拦截，不让路由跳转
      // 设置守卫的地方在src/app/layout/default/default-routing.module.ts  canActivateChild
      // 这个路由守卫在src/app/core/services/common/guard/judgeLogin.guard.ts
      this.windowServe.setSessionStorage(TokenKey, TokenPre + token);
      // 解析token ，然后获取用户信息
      // const userInfo: UserInfo = this.userInfoService.parsToken(TokenPre + token);
      // 这里是模拟用户信息，实际操作应该是上面两行注释，解析登录接口返回的token，获取用户信息
      const userInfo: UserInfo = { userId: 1, authCode: [] };
      // 将用户信息缓存到全局service中
      this.userInfoService.setUserInfo(userInfo);
      // 通过用户id来获取这个用户所拥有的menu
      // 也可以用静态提供的菜单
      this.getMenuByUserId(userInfo.userId)
        .pipe(
          finalize(() => {
            resolve();
          })
        )
        .subscribe(menus => {
          menus = menus.filter(item => {
            item.selected = false;
            item.open = false;
            return item.menuType === 'C';
          });
          const temp = fnFlatDataHasParentToTree(menus);
          // 存储menu
          this.menuService.setMenuArrayStore(temp);
          resolve();
        });
    });
  }

  loginOut(): Promise<void> {
    return new Promise(resolve => {
      // 清空tab
      this.tabService.clearTabs();
      this.windowServe.removeSessionStorage(TokenKey);
      SimpleReuseStrategy.handlers = {};
      SimpleReuseStrategy.scrollHandlers = {};
      this.menuService.setMenuArrayStore([]);
      SimpleReuseStrategy.waitDelete = getDeepReuseStrategyKeyFn(this.activatedRoute.snapshot);
      this.router.navigate(['/login/login-form']).then(() => {
        resolve();
      });
    });
  }
}
