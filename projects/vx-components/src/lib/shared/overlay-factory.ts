import {fromEvent, Observable, Subject, Subscription} from 'rxjs';
import {getNextHighestZIndex} from './util';

export class OverlayRef {
  container: HTMLDivElement;
  overlay: HTMLDivElement;

  overlayHidden = false;
  readonly overlayClick: Observable<Event>;

  private overlayDisplay!: string;
  private overlaySubscription: Subscription;
  private overlayClickSubject = new Subject<Event>();

  constructor(overlayClasses: string[] = [], containerClasses: string[] = []) {
    overlayClasses.push('vx-overlay');
    containerClasses.push('vx-overlay-container');

    const container = document.createElement('div');
    container.className = containerClasses.join(' ');
    this.container = container;

    const overlay = document.createElement('div');
    overlay.className = overlayClasses.join(' ');
    this.container.appendChild(overlay);
    this.overlay = overlay;

    document.body.appendChild(container);

    this.overlaySubscription = fromEvent(this.overlay, 'click').subscribe((event: Event) => {
      this.overlayClickSubject.next(event);
    });

    this.overlayClick = this.overlayClickSubject.asObservable();

    this.hideOverlay();
  }

  hideOverlay(): void {
    if (this.overlayHidden) {
      return;
    }

    this.overlayDisplay = this.overlay.style.display || '';
    this.overlay.style.display = 'none';
    this.overlayHidden = true;

    this.container.style.zIndex = `${getNextHighestZIndex()}`;
  }

  showOverlay(): void {
    if (!this.overlayHidden) {
      return;
    }

    this.overlay.style.display = this.overlayDisplay;
    this.overlayHidden = false;
  }

  destroy(): void {
    this.overlay.remove();
    this.container.remove();
    this.overlaySubscription.unsubscribe();
    this.overlayClickSubject.complete();
  }
}
