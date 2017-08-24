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
