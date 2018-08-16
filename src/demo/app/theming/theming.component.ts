import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import * as Sass from './sass/sass';
import {ThemingService} from './theming.service';
import {Subject} from 'rxjs';
import {debounceTime, tap} from 'rxjs/operators';

Sass.setWorkerUrl('assets/sass/sass.worker.js');
const sass = new Sass();
sass.options({
  sourceMapContents: false
});

const defaultColors = {
  primary: '#3fa0bd',
  background: '#fcfcfc',
  foreground: 'black',
  error: '#bf0000',
  success: '#51a351',
  warn: '#f89406',
  accent: '#FFCA4F'
};

const facebook = {
  ...defaultColors,
  primary: '#4469B0',
  background: '#E9EBEE'
};

const netflix = {
  ...defaultColors,
  primary: '#E21221',
  background: 'black',
  foreground: 'white',
  accent: '#E0E0E0',
  error: '#8d214e'
};

let colors = {...defaultColors};

@Component({
  templateUrl: './theming.component.html',
  styleUrls: ['./theming.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemingComponent implements OnDestroy {
  colors = colors;

  changes = new Subject<void>();

  get shadow(): string {
    return `0 0 3px ${this.colors.foreground}`;
  }

  compiling = false;

  private bundle?: string;
  private el: HTMLStyleElement;

  constructor(private themingService: ThemingService, private cdr: ChangeDetectorRef) {
    this.el = document.createElement('style');
    document.body.appendChild(this.el);

    this.themingService.loadBundle().subscribe(bundle => {
      this.bundle = bundle;

      this.compile();
    });
    this.changes.pipe(tap(() => {
      this.compiling = true;
      this.cdr.markForCheck();
    }), debounceTime(300)).subscribe(() => {

      this.compile().then(success => {
        this.compiling = !success;
        this.cdr.detectChanges();
      });
    })
  }

  compile(): Promise<boolean> {
    return new Promise(resolve => {
      if (!this.bundle) {
        resolve(false);
        return;
      }

      const bundle = this.bundle.replace('$colors: ();', this.buildColors());

      sass.compile(bundle, result => {
        this.addStyle(result.text);
        resolve(true);
      })
    })
  }

  reset(): void {
    this.colors = colors = {...defaultColors};
    this.changes.next();
  }

  facebook(): void {
    this.colors = colors = {...facebook};
    this.changes.next();
  }

  netflix(): void {
    this.colors = colors = {...netflix};
    this.changes.next();
  }

  ngOnDestroy(): void {
    this.changes.complete();
  }

  buildColors(): string {
    return `
      $colors: (
        primary: ${this.colors.primary},
        background: ${this.colors.background},
        foreground: ${this.colors.foreground},
        error: ${this.colors.error},
        success: ${this.colors.success},
        warn: ${this.colors.warn},
        accent: ${this.colors.accent},
      );`
  }

  addStyle(style: string): void {
    this.el.innerHTML = style;
  }


}
