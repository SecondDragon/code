import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DirectivesModule } from '@shared/directives/directives.module';
import { SHARED_ZORRO_MODULES } from '@shared/shared-zorro.module';

import { LayoutHeadRightMenuComponent } from './layout-head-right-menu.component';
import {LockWidgetModule} from "@widget/common-widget/lock-widget/lock-widget.module";
import {SearchRouteModule} from "@widget/common-widget/search-route/search-route.module";
import {ChangePasswordModule} from "@widget/biz-widget/change-password/change-password.module";

@NgModule({
  declarations: [LayoutHeadRightMenuComponent],
  imports: [LockWidgetModule, DirectivesModule, SearchRouteModule, ChangePasswordModule, CommonModule, SHARED_ZORRO_MODULES],
  exports: [LayoutHeadRightMenuComponent]
})
export class LayoutHeadRightMenuModule {}
