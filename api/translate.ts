import { TranslatePayLoad } from 'types';
import {api} from './config';

export const translateGenerateResult = (payload: TranslatePayLoad) => {
  return api({
    url: '/translate/generate-result',
    method: 'POST',
		body: payload,
    hasAuth: false
  });
};
