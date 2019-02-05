import { AfterViewInit, ChangeDetectorRef, EventEmitter, Input, OnDestroy, Output, QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { coerceBooleanProperty } from '../shared';
import { AbstractVxItemComponent } from './abstract-vx-item.component';
import { AttachedPosition, AttachedPositionStrategy } from './position-strategy';

export abstract class AbstractVxMenuComponent<T, E> implements OnDestroy, AfterViewInit {
  _positionStrategyClass?: string;
  _classList: { [key: string]: boolean } = {};
  abstract items: QueryList<AbstractVxItemComponent<T>>;
  /** Event thrown when the menu's visibility changes. The value is the visibility (true or false) */
  @Output() visibleChange = new EventEmitter<boolean>();
  /** Event thrown when one of the menu's items are selected.  The value is the item's value*/
  @Output() itemSelect = new EventEmitter<T>();
  _active = false;
  protected onDestroy$ = new Subject<void>();

  protected lastPosition?: AttachedPosition;

  private _defaultText = '';
  private _visible = false;
  private _positionStrategy: AttachedPositionStrategy = [{
    menuX: 'left',
    menuY: 'top',
    attachedX: 'left',
    attachedY: 'bottom',
    height: 200,
    width: 'auto',
    offsetX: 0,
    offsetY: 10
  },
    {
      menuX: 'left',
      menuY: 'bottom',
      attachedX: 'left',
      attachedY: 'top',
      height: 200,
      width: 'auto',
      offsetX: 0,
      offsetY: -10
    }
  ];
  private _attachedTo!: E;

  constructor(protected cdr: ChangeDetectorRef) {

  }

  @Input('class') set menuClass(classes: string) {
    if (classes && classes.length) {
      this._classList = classes.split(' ').reduce((obj: any, className: string) => {
        obj[className] = true;
        return obj;
      }, {});

      if (this._positionStrategyClass) {
        this._classList[this._positionStrategyClass] = true;
      }
    } else {
      this._classList = {};
    }

    this.cdr.markForCheck();
  }

  @Input()
  get defaultText(): string {
    return this._defaultText;
  }

  set defaultText(value: string) {
    if (value !== this._defaultText) {
      this._defaultText = value;
      this.cdr.markForCheck();
    }
  }

  /** Whether the dropdown is visible */
  @Input()
  get visible(): boolean {
    return this._visible;
  };

  set visible(visible: boolean) {
    visible = coerceBooleanProperty(visible);
    if (visible !== this._visible) {
      this._visible = visible;
      this.visibleChange.emit(visible);

      if (visible) {
        this.show();
      } else {
        this.hide();
      }
      this.cdr.markForCheck();
    }

  };

  @Input()
  get positionStrategy(): AttachedPositionStrategy {
    return this._positionStrategy;
  }

  set positionStrategy(value: AttachedPositionStrategy) {
    if (value && value !== this.positionStrategy) {
      this._positionStrategy = value;
      this.position();
    }
  }

  get attachedTo(): E {
    return this._attachedTo;
  }

  @Input()
  set attachedTo(value: E) {
    if (value !== this._attachedTo) {
      this._attachedTo = value;
      this.position();
    }
  }

  public toggle(): void {
    this.visible = !this.visible;
  }

  abstract show(): void;

  abstract hide(): void;

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngAfterViewInit(): void {
    this.items.changes.pipe(startWith(null), takeUntil(this.onDestroy$)).subscribe(() => {
      this.onItemsChanged();
    });
  }

  protected position(retry = 0): void {
    if (retry === 5) {
      throw new Error('Failed to Position Vx-Menu');
    }

    if (!this.visible) {
      return;
    }

    const attachedPos = this.getAttachedPosition();
    const menuPos = this.getMenuPosition();
    const viewport = this.getViewportSize();

    // If we can't yet get the dimensions wait a bit then retry
    if (!attachedPos || !menuPos || !viewport) {
      setTimeout(() => {
        this.position(retry++);
      }, 50);

      return;
    }

    let foundStrategy: AttachedPosition | undefined;
    let foundPosition: Pos | undefined;
    let isAutoWidth = false;
    let positionOverlap: number | undefined;
    for (const strategy of this.positionStrategy) {
      let xPos = strategy.offsetX;
      let yPos = strategy.offsetY;
      const desiredHeight = menuPos.height > strategy.height ? strategy.height : menuPos.height;
      const desiredWidth = strategy.width === 'auto' ? menuPos.width : (strategy.width === 'match' ? attachedPos.width : strategy.width);

      // Offset the menu position based on our strategy
      xPos -= strategy.menuX === 'center' ? desiredWidth / 2 : (strategy.menuX === 'right' ? desiredWidth : 0);
      yPos -= strategy.menuY === 'center' ? desiredHeight / 2 : (strategy.menuY === 'bottom' ? desiredHeight : 0);

      // Offset the menu position based on our attached object
      xPos += strategy.attachedX === 'left' ? attachedPos.x :
        (strategy.attachedX === 'center' ? attachedPos.x + (attachedPos.width / 2) : attachedPos.x + attachedPos.width);
      yPos += strategy.attachedY === 'top' ? attachedPos.y :
        (strategy.attachedY === 'center' ? attachedPos.y + (attachedPos.height / 2) : attachedPos.y + attachedPos.height);

      // Calculate how much this position overlaps the viewport with a desired margin
      const desiredMargin = 10;
      let overlap = 0;
      if (xPos < desiredMargin) {
        overlap += desiredMargin - xPos;
      }
      if (xPos + desiredWidth + desiredMargin > viewport.width) {
        overlap += xPos + desiredWidth + desiredMargin - viewport.width;
      }
      if (yPos < desiredMargin) {
        overlap += desiredMargin - yPos;
      }
      if (yPos + desiredHeight + desiredMargin > viewport.height) {
        overlap += yPos + desiredHeight + desiredMargin - viewport.height;
      }

      // If this strategy has less overlap than the previous strategy use this
      if (!foundPosition || !positionOverlap || overlap < positionOverlap) {
        foundStrategy = strategy;
        foundPosition = {x: xPos, y: yPos, width: desiredWidth, height: desiredHeight};
        isAutoWidth = strategy.width === 'auto';
        positionOverlap = overlap;
      }

      // If there is no overlap select this strategy
      if (overlap === 0) {
        break;
      }
    }

    if (foundPosition) {
      this.setNativePosition(foundPosition, isAutoWidth);
    }

    if (foundStrategy) {
      this.lastPosition = foundStrategy;

      if (foundStrategy.className !== this._positionStrategyClass) {
        this._positionStrategyClass = foundStrategy.className;
        this.cdr.detectChanges();
      }
    }

  }

  protected onItemsChanged(): void {
    this.cdr.markForCheck();

    if (!this.visible) {
      return;
    }

    // Wait some time to allow the re-render, then reposition.
    setTimeout(() => {
      this.position();
    }, 30);
  }

  protected abstract setNativePosition(pos: Pos, autoWidth: boolean): void;

  protected abstract getAttachedPosition(): Pos | undefined;

  protected abstract getMenuPosition(): Pos | undefined;

  protected abstract getViewportSize(): Size | undefined;
}

export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export type Pos = Point & Size;
