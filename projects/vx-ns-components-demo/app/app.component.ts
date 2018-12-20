import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  value?: string;
  show: any = {};

  constructor(private cdr: ChangeDetectorRef) {
  }


  onChange(e: any, num: number): void {
    this.show[num] = e.value;
    this.cdr.markForCheck();
  }
}
