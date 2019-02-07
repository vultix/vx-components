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
