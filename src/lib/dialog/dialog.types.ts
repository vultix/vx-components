import {VxDialogComponent} from './dialog.component';
export interface DialogButton {
  text: string;
  value?: any;
}
export type DialogOptions = DialogBodyOptions & BaseDialogOptions;

export interface BaseDialogOptions {
  disableClose?: boolean;
  width?: string;
  height?: string;
}

export interface DialogBodyOptions extends BaseDialogOptions {
  body: string;
  title?: string;
  buttons?: DialogButton[];
  loading?: boolean;
  defaultButtonIdx?: number;
}

export interface OnDialogOpen<T = undefined> {
  onDialogOpen(dialog: VxDialogComponent, data: T): void;
}
