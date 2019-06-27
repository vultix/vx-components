export function findInArrayByDirection<T>(items: T[], startIndex: number, testFunction: (item: T) => boolean,
                                          forward = true): { item: T, idx: number } | undefined {
  const length = items.length;
  for (let i = startIndex; forward ? i < length : i >= 0; forward ? i++ : i--) {
    const item = items[i];
    if (testFunction(item)) {
      return {item, idx: i};
    }
  }

  return;
}

export function clampNumber(numToClamp: number, min: number, max: number): number {
  return Math.max(Math.min(numToClamp, max), min);
}

export function roundTo(toRound: number, round: number): number {
  if (round <= 0) {
    return toRound;
  }

  return round * Math.round(toRound / round);
}


export function compareArrays(a: any[], b: any[]): boolean {
  if (a === b) {
    return true;
  }

  if (!a || !b) {
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}
