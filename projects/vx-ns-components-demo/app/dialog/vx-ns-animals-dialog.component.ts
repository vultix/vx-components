import { Component } from '@angular/core';
import { VxNsDialogDef, VxNsDialogRef } from 'vx-ns-components';

@Component({
  template: `
    <Label text="I did the dialog!, {{animal}}"></Label>
  `
})
export class VxNsAnimalsDialogComponent extends VxNsDialogDef<'cat' | 'dog', boolean> {
  animal: 'cat' | 'dog';
  constructor(private ref: VxNsDialogRef<VxNsAnimalsDialogComponent>) {
    super();
    this.animal = ref.data;

    ref.backButtonPress.subscribe(() => {
      console.log('The back button was pressed!')
    });

    ref.overlayTap.subscribe(() => {
      ref.close(false);
    })
  }

}
