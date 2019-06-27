let zIndex = 10000;

export function getNextHighestZIndex(): number {
  return zIndex++;
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


export function isDefined(item: any): boolean {
  return item !== undefined && item !== null;
}
