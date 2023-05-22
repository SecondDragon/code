import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PageHeaderType } from '@shared/components/page-header/page-header.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '欢迎',
    breadcrumb: ['首页', '欢迎'],
    desc: 'ng-ant-admin 是一个基于Angular和ng-zorro的后台解决方案，目标是为中大型项目开发，提供现成的开箱解决方案以及丰富的示例，不限制任何代码用于商用'
  };
  constructor() {}

  ngOnInit(): void {}
}
