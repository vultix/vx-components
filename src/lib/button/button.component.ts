import {ChangeDetectionStrategy, Component, HostListener, Inject, InjectionToken, Input, Optional} from '@angular/core';


// TODO: find way to import the VxButtonGroupComponnet
export const VxButtonGroupToken = new InjectionToken<any>('VxButtonGroupToken');

@Component({
  selector: 'button[vx-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: {
    '[class.vx-button]': 'true',
    '[class.vx-button-group-button]': '!!buttonGroup',
    '[class.vx-button-group-selected-button]': 'isSelectedButtonGroupButton'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VxButtonComponent {
  @Input('vx-button') value?: any;

  constructor(@Inject(VxButtonGroupToken) @Optional() public buttonGroup: any) {
  }

  get isSelectedButtonGroupButton(): boolean {
    return !!this.buttonGroup && this.buttonGroup.value !== undefined && this.buttonGroup.value === this.value;
  }

  @HostListener('click')
  onClick(): void {
    if (this.buttonGroup) {
      this.buttonGroup.handleButtonClick(this);
    }
  }
}
