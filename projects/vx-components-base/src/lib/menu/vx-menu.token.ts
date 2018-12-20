import { InjectionToken } from '@angular/core';
import { AbstractVxMenuComponent } from './abstract-vx-menu.component';

export const VX_MENU_TOKEN = new InjectionToken<AbstractVxMenuComponent<any, any>>('VX_MENU_TOKEN');
