export function coerceBooleanProperty(value: any): boolean {
  // tslint:disable-next-line
  return value != null && `${value}` !== 'false';
}

export function getStyleOnElement(el: HTMLElement, styleProp: keyof CSSStyleDeclaration): string {
  if (document.defaultView && document.defaultView.getComputedStyle) {
    return document.defaultView.getComputedStyle(el)[styleProp];
  } else {
    return el.style[styleProp];
  }
}

export function getHighestZIdx(): number {
  const elements = document.querySelectorAll('body *:not(script):not(link):not(style)');
  let zIndex = 0;
  // tslint:disable-next-line
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    const newZ = +getStyleOnElement(el as HTMLElement, 'zIndex') || zIndex;
    zIndex = zIndex > newZ ? zIndex : newZ;
  }

  return zIndex + 1;
}

export function removeFromArray<T>(arr: T[], item: T): T[] {
  const idx = arr.indexOf(item);
  if (idx > -1) {
    arr.splice(idx, 1);
  }
  return arr;
}

export function isDefined(item: any): boolean {
  return item !== undefined && item !== null;
}

export function getTouchPos(event: MouseEvent | TouchEvent): { x: number, y: number } {
  let x: number;
  let y: number;

  if (event instanceof TouchEvent) {
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
  } else {
    x = event.clientX;
    y = event.clientY;
  }

  return {x, y};
}


export function roundTo(toRound: number, round: number): number {
  if (round <= 0)
    return toRound;

  return round * Math.round(toRound / round);
}

export function boundNumber(toBound: number, min: number, max: number): number {
  return Math.max(Math.min(toBound, max), min);
}
