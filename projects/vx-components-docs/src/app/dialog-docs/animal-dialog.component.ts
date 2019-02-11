import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { VxDialogDef, VxDialogRef, DialogDataType } from 'vx-components';
import { Constructor } from 'vx-components-base';


type AnimalName = 'dog' | 'cat';

@Component({
  template: `
    <h2>Your Animal: {{dialog.data}}</h2>
    <button vx-button (click)="dialog.close(true)">Close True</button>
    <button vx-button (click)="dialog.close(false)">Close false</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AnimalDialogComponent extends VxDialogDef<AnimalName, boolean> {
  cat: AnimalName;

  constructor(public dialog: VxDialogRef<AnimalDialogComponent>) {
    super();
    // this.test()

    this.cat = this.dialog.data;
    dialog.overlayClick.subscribe(() => dialog.close(false));
  }

}

// let x: VxNsDialogRef<AnimalDialogComponent>;
// x.data
