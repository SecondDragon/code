import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NormalLoginComponent } from '@app/pages/other-login/normal-login/normal-login.component';
import { IsNightKey } from '@config/constant';
import { ThemeSkinService } from '@core/services/common/theme-skin.service';
import { WindowService } from '@core/services/common/window.service';
import { AdComponent, DynamicComponent } from '@core/services/types';
import { AdDirective } from '@shared/directives/ad.directive';
import { Login1StoreService } from '@store/biz-store-service/other-login/login1-store.service';
import { ThemeService } from '@store/common-store/theme.service';

export enum LoginType {
  Normal,
  Register
}

interface LoginFormComponentInterface {
  type: LoginType;
  component: DynamicComponent;
}

@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login1Component implements OnInit, OnDestroy {
  private adHost!: AdDirective;
  isOverModel = true;
  isNightTheme$ = this.themesService.getIsNightTheme();

  @ViewChild(AdDirective) set adHost1(content: AdDirective) {
    if (content) {
      this.adHost = content;
      this.subLoginType();
      this.cdr.detectChanges();
    }
  }

  private destory$ = new Subject<void>();
  formData: LoginFormComponentInterface[] = [{ type: LoginType.Normal, component: new DynamicComponent(NormalLoginComponent, {}) }];

  constructor(
    private themeSkinService: ThemeSkinService,
    private windowServe: WindowService,
    private cdr: ChangeDetectorRef,
    private login1StoreService: Login1StoreService,
    private breakpointObserver: BreakpointObserver,
    private themesService: ThemeService
  ) {}

  getCurrentComponent(type: LoginType): LoginFormComponentInterface {
    return this.formData.find(item => item.type === type)!;
  }

  to(adItem: LoginFormComponentInterface): void {
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<AdComponent>(adItem.component.component);
    componentRef.instance.data = adItem.component.data;
  }

  changeNight(isNight: boolean): void {
    this.windowServe.setStorage(IsNightKey, `${isNight}`);
    this.themesService.setIsNightTheme(isNight);
    this.themeSkinService.toggleTheme().then(() => {
      this.cdr.markForCheck();
    });
  }

  subLoginType(): void {
    this.to(this.getCurrentComponent(LoginType.Normal));
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 1200px)'])
      .pipe(takeUntil(this.destory$))
      .subscribe(res => {
        this.isOverModel = res.matches;
        this.login1StoreService.setIsLogin1OverModelStore(res.matches);
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }
}
