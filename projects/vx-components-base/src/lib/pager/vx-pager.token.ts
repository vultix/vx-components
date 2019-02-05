import { InjectionToken } from '@angular/core';
import { AbstractVxPageComponent } from './abstract-vx-page.component';
import { AbstractVxPagerComponent } from './abstract-vx-pager.component';

export const VX_PAGER_TOKEN = new InjectionToken<AbstractVxPagerComponent<any>>('VX_PAGER_TOKEN');
