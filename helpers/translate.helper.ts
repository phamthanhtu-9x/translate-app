import {Language} from './../types/index';
import {ECONFIG} from '../enums/translate';

export const sortLanguages = (languageList: Language[]) => {
  languageList = languageList.slice(0, ECONFIG.LIMIT_LANGUAGE);
  return languageList;
};

export const addLanguageToList = (languageList: Language[], language: string) => {
  const index = languageList.findIndex((lang) => lang.language === language);
  const hasLanguage = index !== -1;

  if (hasLanguage) {
    languageList.splice(index, 1);
  }
  languageList.unshift({
    language,
  });

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
