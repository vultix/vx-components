import {Component, Input, Renderer, AfterViewInit, Output, EventEmitter, OnDestroy} from '@angular/core';

@Component({
  selector: 'vx-number-spinner',
  template: `
     <div (mousedown)="onMouseDown('up')" (mouseup)="onMouseUp()" (mouseleave)="onMouseUp()"></div>
     <div class="spinner-down" (mousedown)="onMouseDown('down')" (mouseup)="onMouseUp()" (mouseleave)="onMouseUp()"></div>
  `,
  styleUrls: ['./number-spinner.component.scss'],
})
export class VxNumberSpinnerComponent implements AfterViewInit, OnDestroy {
  @Input() input: HTMLInputElement;
  @Input() value: number;

  @Output() valueChange = new EventEmitter<number>();

  // Numeric
  @Input() set min(val: string|number) {
    this._min = parseNumber(val);
    setTimeout(() => {
      if (hasValue(this.value) && this.value < this._min) {
        this.value = this._min;
        this.valueChange.emit(this.value);
      }
    });
  }

  @Input() set max(val: string|number) {
    this._max = parseNumber(val);
    setTimeout(() => {
      if (hasValue(this.value) && this.value > this._max) {
        this.value = this._max;
        this.valueChange.emit(this.value);
      }
    });
  };

  _min = 0;
  _max: number;

  private timeout: any;
  private keyPressListener: Function;
  private keyDownListener: Function;
  private changeListener: Function;

  constructor(private renderer: Renderer) {
  }


  changeValue(dir: 'up' | 'down') {
    if (!this.value) {
      this.value = 0;
    }
    let newVal = parseNumber(this.value) + (dir === 'up' ? 1 : -1);
    if (newVal > this._max) {
      newVal = this._max;
    }
    if (newVal < this._min) {
      newVal = this._min;
    }

    this.value = newVal;
    this.valueChange.emit(newVal);
  }

  repeat(dir: 'up' | 'down') {
    this.changeValue(dir);
    this.timeout = setTimeout(() => this.repeat(dir), 75);
  }

  onMouseDown(dir: 'up' | 'down') {
    this.validateInput();
    this.changeValue(dir);
    this.timeout = setTimeout(() => this.repeat(dir), 500);
  }

  onMouseUp() {
    clearTimeout(this.timeout);
  }

  private validateInput() {
    const val = parseNumber(this.input.value);
    if (!isNaN(val)) {
      let newVal = val;
      if (val > this._max) {
        newVal = this._max;
      } else if (val < this._min) {
        newVal = this._min;
      }

      this.value = newVal;
    } else {
      this.value = null;
    }
    this.valueChange.emit(this.value);

  }

  public ngAfterViewInit(): void {
    this.keyPressListener = this.renderer.listen(this.input, 'keypress', (event: KeyboardEvent) => {
      if (event.which === 13) {
        this.validateInput();
      }
      return event.which >= 48 && event.which <= 57;
    });

    this.keyDownListener = this.renderer.listen(this.input, 'keydown', (event: KeyboardEvent) => {
      if (event.which === 38) {
        this.changeValue('up');
        return false;
      } else if (event.which === 40) {
        this.changeValue('down');
        return false;
      }
    });

    this.changeListener = this.renderer.listen(this.input, 'change', () => this.validateInput());

    if (isNaN(this.value)) {
      setTimeout(() => {
        this.value = null;
        this.valueChange.emit(null);
      });
    }
  }

  ngOnDestroy(): void {
    this.keyPressListener();
    this.changeListener();
  }
}

function hasValue(val: any) {
  return !(val === null || val === undefined || val === '');
}

function parseNumber(num: string|number): number {
  if (typeof num === 'string') {
    return parseInt(num, 10);
  } else {
    return num;
  }
}
