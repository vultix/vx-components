import { ChangeDetectorRef, Component } from '@angular/core';
import { VxNsDialogDef, VxNsDialogRef } from 'vx-ns-components';

@Component({
  template: `
    <Label text="I did the dialog!, {{animal}}" (tap)="test()"></Label>
  `
})
export class VxNsAnimalsDialogComponent extends VxNsDialogDef<'cat' | 'dog', boolean> {
  animal: 'cat' | 'dog' | 'hilo';
  constructor(private ref: VxNsDialogRef<VxNsAnimalsDialogComponent>, private cdr: ChangeDetectorRef) {
    super();
    this.animal = ref.data;

    ref.backButtonPress.subscribe(() => {
      console.log('The back button was pressed!')
    });

    ref.overlayTap.subscribe(() => {
      console.log('The overlay was tapped!');
      ref.close(false);
    })

    setTimeout(() => {
      this.animal = 'hilo';
      this.cdr.markForCheck();
    }, 5000)
  }

  test(): void {
    console.log('Tap from the label~')
  }

}
