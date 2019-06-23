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


export function roundTo(toRound: number, round: number): number {
  if (round <= 0) {
    return toRound;
  }

  return round * Math.round(toRound / round);
}
