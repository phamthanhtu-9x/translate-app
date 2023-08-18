import {Language} from '../types/index';

export const moveLanguageToTop = (languageList: Language[], item: Language) => {
  languageList = languageList.filter((language) => language.language !== item.language);
  languageList.unshift(item);

  return languageList;
};
