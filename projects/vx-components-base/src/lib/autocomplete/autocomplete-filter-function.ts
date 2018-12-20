import {AbstractVxItemComponent} from '../menu';
import {InjectionToken} from '@angular/core';

export const AUTOCOMPLETE_FILTER_FUNCTION = new InjectionToken<AutocompleteFilterFunction<any>>('AUTOCOMPLETE_FILTER_FUNCTION');

export type AutocompleteFilterFunction<T> =
  (items: AbstractVxItemComponent<T>[], searchText: string, selectedItems?: T[]) => AbstractVxItemComponent<T>[];


export const defaultAutocompleteFilterFunction: AutocompleteFilterFunction<any> = (items, searchText, selectedItems) => {
  searchText = searchText.toUpperCase();
  const scores: {[itemId: string]: number} = {};

  // The scores are negative based.  The lower the score the worse you did
  return items.filter(item => {
    // Remove the already selected items (for the case of multiple selection autocomplete)
    if (selectedItems && selectedItems.includes(item.value)) {
      return false;
    }

    const itemText = item.getTextContent().toUpperCase();
    const itemTextLength = itemText.length;

    // A super simple fuzzy search, checks if the characters are in the item text in the same order
    let idx = -1;
    let score = 0;
    for (const char of searchText) {
      let foundChar = false;
      for (let i = idx + 1; i < itemTextLength; i++) {
        if (itemText[i] === char) {
          foundChar = true;

          // When this character is the beginning of a word increase the score
          if (i === 0 || itemText[i - 1] === ' ') {
            score += i === 0 ? 2 : 1;
          } else {
            // Otherwise subtract the distance between the matches
            score -= i - idx;
          }

          idx = i;
          break;
        }
      }

      if (!foundChar) {
        return false;
      }
    }
    scores[item._id] = score;
    return true;
  }).sort((a, b) => {
    const scoreA = scores[a._id] || 0;
    const scoreB = scores[b._id] || 0;

    return scoreA < scoreB ? 1 : scoreA === scoreB ? 0 : -1;
  });
};

