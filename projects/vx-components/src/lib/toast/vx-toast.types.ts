import {Type} from '@angular/core';

export interface ToastOptions {
  position?: ToastPosition;
  duration?: number;
  type?: ToastType;
}

export interface CreateToastOptions extends ToastOptions {
  text: string;
  title?: string;
  showClose?: boolean;
}

export interface ToastComponentOptions extends ToastOptions {
  component: Type<any>;
}

export type OpenToastOptions = CreateToastOptions | ToastComponentOptions;

export type ToastPosition = 'top-left' | 'top-middle' | 'top-right' | 'bottom-left' | 'bottom-middle' | 'bottom-right';
export type ToastType = 'error' | 'info' | 'success' | 'warn';
