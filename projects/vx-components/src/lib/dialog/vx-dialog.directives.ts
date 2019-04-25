import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[vxFocusInitial]',
  host: {
    '[attr.cdkFocusInitial]': 'true'
  }
})
export class VxFocusInitialDirective {
}

@Directive({
  selector: '[vxDialogTitle]',
  host: {
    'class': 'vx-dialog-title'
  }
})
export class VxDialogTitleDirective<CloseDataType> {
  constructor(private el: ElementRef) {
  }
}

@Directive({
  selector: '[vxDialogContent]',
  host: {
    'class': 'vx-dialog-content'
  }
})
export class VxDialogContentDirective<CloseDataType> {
}

@Directive({
  selector: '[vxDialogActions]',
  host: {
    'class': 'vx-dialog-actions'
  }
})
export class VxDialogActionsDirective<CloseDataType> {
}
