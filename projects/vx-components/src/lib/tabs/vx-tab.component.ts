import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

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

  @ViewChild(TemplateRef) _template!: TemplateRef<any>
}
