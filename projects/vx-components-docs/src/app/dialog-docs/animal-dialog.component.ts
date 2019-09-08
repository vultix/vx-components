import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { VxDialogDef, VxDialogRef } from 'vx-components';
import { Constructor } from 'vx-components-base';


type AnimalName = 'dog' | 'cat';

@Component({
  template: `
    <h2 vxDialogTitle>Your Animal: {{dialog.data}}</h2>
    <div vxDialogContent>
      Here is my super duper long content that should scroll!
      <a href="google.com">Go to google!</a>
      <vx-autocomplete>
        <vx-item>A</vx-item><vx-item>B</vx-item>
      </vx-autocomplete>
    </div>
    <div vxDialogActions>
      <button vx-button (click)="dialog.close(true)">Close True</button>
      <button vx-button (click)="dialog.close(false)">Close false</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimalDialogComponent extends VxDialogDef<AnimalName, boolean> {
  cat: AnimalName;

  constructor(public dialog: VxDialogRef<AnimalDialogComponent>) {
    super();
    // this.test()

    this.cat = this.dialog.data;
    dialog.onCancel.subscribe(() => dialog.close(false));
  }

}

// let x: VxNsDialogRef<AnimalDialogComponent>;
// x.data
