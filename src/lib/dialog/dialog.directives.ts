import {Directive} from '@angular/core';

@Directive({
  selector: '[vx-dialog-title]'
})
export class VxDialogTitleDirective {
}

@Directive({
  selector: '[vx-dialog-content]'
})
export class VxDialogContentDirective {
}

@Directive({
  selector: '[vx-dialog-actions]'
})
export class VxDialogActionsDirective {
}
