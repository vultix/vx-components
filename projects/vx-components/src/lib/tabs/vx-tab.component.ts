import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { VxTabLabelDirective } from './vx-tab-label.directive';

@Component({
  selector: 'vx-tab',
  template: `
    <ng-template #template>
      <ng-content></ng-content>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VxTabComponent {
  @Input() label = '';
  @ContentChild(VxTabLabelDirective) tabLabel?: VxTabLabelDirective;

  @ViewChild(TemplateRef) _template!: TemplateRef<any>
}
