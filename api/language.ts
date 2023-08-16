import {api} from './config';

export const getAllLanguage = () => {
  return api({
    url: '/getAllLanguage',
    method: 'GET'
  });
};
