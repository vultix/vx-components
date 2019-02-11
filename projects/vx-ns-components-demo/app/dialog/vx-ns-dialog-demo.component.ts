import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VxNsDialog } from 'vx-ns-components';
import { VxNsAnimalsDialogComponent } from './vx-ns-animals-dialog.component';

@Component({
  templateUrl: 'vx-ns-dialog-demo.component.html',
  styleUrls: ['vx-ns-dialog-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VxNsDialogDemoComponent {
  constructor(private dialog: VxNsDialog) {

  }

  open(): void {
    console.log('Opening!');
    this.dialog.open(VxNsAnimalsDialogComponent, 'cat');

    setTimeout(() => {
      this.dialog.open(VxNsAnimalsDialogComponent, 'dog');
    }, 2000)

  }
}
