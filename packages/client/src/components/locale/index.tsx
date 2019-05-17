import { createContext } from 'react';

import pl from './pl.json';

export type LocaleEntry = keyof typeof pl;

function createLanguagePack<T>(texts: T) {
  return {
    texts,
    getText(key: string) {
      const val = texts[key as keyof T];
      if (val) {
        return val;
      }

      return undefined;
    },
  };
}

export const LocaleContext = createContext(createLanguagePack(pl));
