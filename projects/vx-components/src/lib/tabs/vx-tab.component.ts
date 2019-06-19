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
  @ContentChild(VxTabLabelDirective, {static: false}) tabLabel?: VxTabLabelDirective;

  @ViewChild(TemplateRef, {static: false}) _template!: TemplateRef<any>
}
