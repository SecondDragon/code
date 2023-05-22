import { ComponentPortal, ComponentType, Portal } from '@angular/cdk/portal';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';

import { AdvancedComponent } from '@app/pages/feat/charts/echarts/advanced/advanced.component';
import { SeriesComponent } from '@app/pages/feat/charts/echarts/series/series.component';
import { StartedComponent } from '@app/pages/feat/charts/echarts/started/started.component';
import { PageHeaderType } from '@shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

enum TabEnum {
  Started,
  Advanced,
  Series
}

type targetComp = StartedComponent | AdvancedComponent | SeriesComponent;

@Component({
  selector: 'app-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EchartsComponent implements OnInit, AfterViewInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Echarts',
    breadcrumb: ['首页', '功能', '图表', 'Echarts'],
    desc: 'Echarts的示例内容'
  };
  @ViewChild('headerFooter', { static: false }) headerFooter!: TemplateRef<NzSafeAny>;

  tabEnum = TabEnum;
  currentSelTab: number = this.tabEnum.Started;
  componentArray: Array<ComponentType<targetComp>> = [StartedComponent, AdvancedComponent, SeriesComponent];
  componentPortal?: ComponentPortal<targetComp>;
  selectedPortal!: Portal<any>;

  constructor(private cdr: ChangeDetectorRef) {}

  to(tabIndex: TabEnum): void {
    this.currentSelTab = tabIndex;
    this.componentPortal = new ComponentPortal(this.componentArray[tabIndex]);
    this.selectedPortal = this.componentPortal;
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.to(this.tabEnum.Started);
  }

  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: 'Echarts',
      desc: 'Echarts的示例内容',
      breadcrumb: ['首页', '功能', '图表', 'Echarts'],
      footer: this.headerFooter
    };
  }
}
