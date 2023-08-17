import {api} from './config';


export const getSupportedLanguages = () => {
  return api({
    url: '/translate/get-supported-languages',
    method: 'GET',
    hasAuth: false
  });
};
