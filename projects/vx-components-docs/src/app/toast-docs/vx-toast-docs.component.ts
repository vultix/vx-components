import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { VxPagerComponent } from 'vx-components';
import { VxToast } from 'vx-components';

@Component({
  selector: 'vx-checbox-docs',
  templateUrl: 'vx-toast-docs.component.html',
  styleUrls: ['vx-toast-docs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VxToastDocsComponent implements OnInit {
  constructor(private title: Title, private toast: VxToast) {
    this.title.setTitle('vx-toast');
  }

  ngOnInit() {
  }

  open(): void {
    this.toast.open({
      text: 'Here is the text',
      title: 'Error',
      position: 'top-right',
      type: 'success'
    })
  }

}
