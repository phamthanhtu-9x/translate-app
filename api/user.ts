import {api} from './config';
import { FormDataPayLoad } from 'types';


export const register = (payload : FormDataPayLoad) => {
  return api({
    url: '/auth/register',
    method: 'POST',
    hasAuth: false,
    body : payload
  });
};

export const login = (payload : FormDataPayLoad) => {
  return api({
    url: '/auth/login',
    method: 'POST',
    hasAuth: false,
    body : payload
  });
};