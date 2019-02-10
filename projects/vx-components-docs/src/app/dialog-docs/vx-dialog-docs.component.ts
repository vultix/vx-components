import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { VxDialog, VxDialogRef, DialogDataType } from 'vx-components';
import { AnimalDialogComponent } from './animal-dialog.component';

@Component({
  templateUrl: 'vx-dialog-docs.component.html',
  styleUrls: ['vx-dialog-docs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VxDialogDocsComponent {

  constructor(private title: Title, private dialog: VxDialog) {
    title.setTitle('Vx-Dialog');
  }

  open(): void {
    const ref = this.dialog.open(AnimalDialogComponent, 'cat');

    ref.onClose.subscribe(val => {
      console.log('Closed with value: ', val);
    });
  }
}
