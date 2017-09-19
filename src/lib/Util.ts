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
