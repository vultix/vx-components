import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { VxPagerComponent } from 'vx-components';

@Component({
  selector: 'vx-pager-docs',
  templateUrl: 'vx-pager-docs.component.html',
  styleUrls: ['vx-pager-docs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VxPagerDocsComponent implements OnInit {
  a?: string;
  c?: string;
  constructor(private title: Title) {
    this.title.setTitle('vx-pager');
  }

  ngOnInit() {
  }

  test(pager: VxPagerComponent) {
    if (this.c) {
      pager.selectedPage--;
    } else if (this.a) {
      pager.selectedPage++;
    }
  }
}
