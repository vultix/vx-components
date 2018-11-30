import {AbstractVxFormFieldDirective} from './abstract-vx-form-field.directive';
import {AfterContentInit, ChangeDetectorRef, ContentChild, OnDestroy, OnInit, Type} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

export abstract class AbstractVxFormFieldComponent implements OnInit, OnDestroy {
  abstract field: AbstractVxFormFieldDirective<any>;

  protected abstract fieldDirectiveName: string;
  protected abstract componentName: string;


  protected readonly onDestroy$ = new Subject<void>();

  constructor(protected cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    if (!this.field) {
      throw new Error(`${this.componentName} without a ${this.fieldDirectiveName} directive`);
    }
    this.field.stateChanges.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.cdr.markForCheck();
    })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
