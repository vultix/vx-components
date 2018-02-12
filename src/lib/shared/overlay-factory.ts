import {getHighestZIdx} from './util';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {SubscriptionLoggable} from 'rxjs/testing/SubscriptionLoggable';
import {Subscription} from 'rxjs/Subscription';

export class OverlayFactory {
  static createOverlay(overlayClasses: string[] = [], containerClasses: string[] = []): OverlayRef {
    overlayClasses.push('vx-overlay');
    containerClasses.push('vx-overlay-container');
    const overlayRef = new OverlayRef();

    const container = document.createElement('div');
    container.className = containerClasses.join(' ');
    container.style.position = 'absolute';
    container.style.zIndex = `${getHighestZIdx()}`;
    overlayRef.container = container;

    const overlay = document.createElement('div');
    overlay.className = overlayClasses.join(' ');
    overlayRef.overlay = overlay;
    container.appendChild(overlay);

    document.body.appendChild(container);
    return overlayRef;
  }
}

export class OverlayRef {
  container: HTMLDivElement;
  overlayHidden = false;
  readonly overlayClick: Observable<Event>;

  private overlayDisplay: string;
  private overlaySubscription: Subscription;
  private _overlay: HTMLDivElement;
  private overlayClickSubject = new Subject<Event>();

  constructor() {
    this.overlayClick = this.overlayClickSubject.asObservable();
  }

  get overlay(): HTMLDivElement {
    return this._overlay;
  }

  set overlay(value: HTMLDivElement) {
    this._overlay = value;
    if (this.overlaySubscription) {
      this.overlaySubscription.unsubscribe();
    }

    this.overlaySubscription = Observable.fromEvent(this.overlay, 'click').subscribe((event: Event) => {
      this.overlayClickSubject.next(event);
    });
    this.hideOverlay();
  }

  hideOverlay(): void {
    if (this.overlayHidden)
      return;

    this.overlayDisplay = this._overlay.style.display || '';
    this._overlay.style.display = 'none';
    this.overlayHidden = true;
  }

  showOverlay(): void {
    if (!this.overlayHidden)
      return;

    this._overlay.style.display = this.overlayDisplay;
    this.overlayHidden = false;
  }

  destroy(): void {
    this._overlay.remove();
    this.container.remove();
    this.overlaySubscription.unsubscribe();
    this.overlayClickSubject.complete();
  }
}
