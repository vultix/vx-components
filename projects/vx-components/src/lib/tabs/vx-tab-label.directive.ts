import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[vxTabLabel]'
})
export class VxTabLabelDirective {
  constructor (public templateRef: TemplateRef<any>) {
  }
}
