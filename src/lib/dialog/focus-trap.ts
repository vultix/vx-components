/**
 * Class that allows for trapping focus within a DOM element.
 *
 * This class currently uses a relatively simple approach to focus trapping.
 * It assumes that the tab order is the same as DOM order, which is not necessarily true.
 * Things like tabIndex > 0, flex `order`, and shadow roots can cause to two to misalign.
 */
import {take} from 'rxjs/operators';
import {NgZone} from '@angular/core';
import {InteractivityChecker} from './interactivity-checker';

export class FocusTrap {
  private _startAnchor: HTMLElement | null;
  private _endAnchor: HTMLElement | null;

  /** Whether the focus trap is active. */
  get enabled(): boolean { return this._enabled; }
  set enabled(val: boolean) {
    this._enabled = val;

    if (this._startAnchor && this._endAnchor) {
      this._startAnchor.tabIndex = this._endAnchor.tabIndex = this._enabled ? 0 : -1;
    }
  }
  private _enabled = true;

  constructor(
    private _element: HTMLElement,
    private _ngZone: NgZone,
    private _document: Document,
    deferAnchors = false) {

    if (!deferAnchors) {
      this.attachAnchors();
    }
  }

  /** Destroys the focus trap by cleaning up the anchors. */
  destroy(): void {
    if (this._startAnchor && this._startAnchor.parentNode) {
      this._startAnchor.parentNode.removeChild(this._startAnchor);
    }

    if (this._endAnchor && this._endAnchor.parentNode) {
      this._endAnchor.parentNode.removeChild(this._endAnchor);
    }

    this._startAnchor = this._endAnchor = null;
  }

  /**
   * Inserts the anchors into the DOM. This is usually done automatically
   * in the constructor, but can be deferred for cases like directives with `*ngIf`.
   */
  attachAnchors(): void {
    if (!this._startAnchor) {
      this._startAnchor = this._createAnchor();
    }

    if (!this._endAnchor) {
      this._endAnchor = this._createAnchor();
    }

    this._ngZone.runOutsideAngular(() => {
      this._startAnchor!.addEventListener('focus', () => {
        this.focusLastTabbableElement();
      });

      this._endAnchor!.addEventListener('focus', () => {
        this.focusFirstTabbableElement();
      });

      if (this._element.parentNode) {
        this._element.parentNode.insertBefore(this._startAnchor!, this._element);
        this._element.parentNode.insertBefore(this._endAnchor!, this._element.nextSibling);
      }
    });
  }

  /**
   * Waits for the zone to stabilize, then either focuses the first element that the
   * user specified, or the first tabbable element.
   * @returns Returns a promise that resolves with a boolean, depending
   * on whether focus was moved successfuly.
   */
  focusInitialElementWhenReady(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this._executeOnStable(() => resolve(this.focusInitialElement()));
    });
  }

  /**
   * Focuses the element that should be focused when the focus trap is initialized.
   * @returns Whether focus was moved successfuly.
   */
  private focusInitialElement(): boolean {
    // Contains the deprecated version of selector, for temporary backwards comparability.
    const redirectToElement = this._element.querySelector(`[vxFocusInitial]`) as HTMLElement;

    if (redirectToElement) {
      redirectToElement.focus();
      return true;
    }

    return this.focusFirstTabbableElement();
  }

  /**
   * Focuses the first tabbable element within the focus trap region.
   * @returns Whether focus was moved successfuly.
   */
  private focusFirstTabbableElement(): boolean {
    const redirectToElement = InteractivityChecker.getFirstTabbableElement(this._element);

    if (redirectToElement) {
      redirectToElement.focus();
    }

    return !!redirectToElement;
  }

  /**
   * Focuses the last tabbable element within the focus trap region.
   * @returns Whether focus was moved successfuly.
   */
  private focusLastTabbableElement(): boolean {
    const redirectToElement = InteractivityChecker.getLastTabbableElement(this._element);

    if (redirectToElement) {
      redirectToElement.focus();
    }

    return !!redirectToElement;
  }

  /** Creates an anchor element. */
  private _createAnchor(): HTMLElement {
    const anchor = this._document.createElement('div');
    anchor.tabIndex = this._enabled ? 0 : -1;
    anchor.classList.add('vx-visually-hidden');
    return anchor;
  }

  /** Executes a function when the zone is stable. */
  private _executeOnStable(fn: () => any): void {
    if (this._ngZone.isStable) {
      fn();
    } else {
      this._ngZone.onStable.asObservable().pipe(take(1)).subscribe(fn);
    }
  }
}
