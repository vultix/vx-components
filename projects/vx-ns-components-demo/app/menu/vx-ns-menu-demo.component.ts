import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { VxNsMenuComponent } from 'vx-ns-components';

@Component({
  templateUrl: 'vx-ns-menu-demo.component.html',
  styleUrls: ['vx-ns-menu-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VxNsMenuDemoComponent {
  @ViewChild('menu') menu!: VxNsMenuComponent<any>;

  test(): void {
    if (this.menu) {
      this.menu.toggle();
    }
  }
}
