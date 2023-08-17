import {Language} from '../types/index';

export const moveLanguageToTop = (languageList: Language[], item: Language) => {
  languageList = languageList.filter((language) => language.code !== item.code);
  languageList.unshift(item);

  return languageList;
};
