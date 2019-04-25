import { InjectionToken } from '@angular/core';
import { VxThemeColor } from '../shared/vx-theme-color';
import { VxButtonVariation } from './vx-button-variation';

export const VX_BUTTON_DEFAULT_COLOR = new InjectionToken<VxThemeColor>('VX_BUTTON_DEFAULT_COLOR');
export const VX_BUTTON_DEFAULT_VARIATION = new InjectionToken<VxButtonVariation>('VX_BUTTON_DEFAULT_VARIATION');
