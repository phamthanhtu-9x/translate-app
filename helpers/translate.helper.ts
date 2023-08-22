import {Language} from '../types/index';

export const moveLanguageToTop = (languageList: Language[], item: Language) => {
  languageList = languageList.filter((language) => language.language !== item.language);
  languageList.unshift(item);

  return languageList;
};

export const addLanguageToList = (languageList: Language[], item: Language) => {
  languageList = languageList.filter((language) => language.language !== item.language);
  languageList.push(item);

  return languageList;
};

export const handlePaste = (event: ClipboardEvent) => {
  event.preventDefault();

  const plainText = event.clipboardData?.getData('text/plain');

  if (plainText) {
    const formattedText = formatPastedContent(plainText);
    document.execCommand('insertHTML', false, formattedText);
  }
};

export const formatPastedContent = (text: string): string => {
  const lines = text.replaceAll('\r', '').split('\n');
  const formattedLines = lines.filter((line) => line !== '').map((line) => `<p>${line}</p>`);

  return formattedLines.join('<br>');
};

export const getLanguageName = (languages: any, source: string) => {
  if (languages === undefined) return;
  return languages.find((language: Language) => language.language === source).name;
};
