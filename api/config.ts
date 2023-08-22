import {ApiProps} from 'types';

export const api = (props: ApiProps) => {
  const {url, method, hasAuth, params, body} = props;
  const runtimeConfig = useRuntimeConfig();
  const {data}: any = useAuth();

  return $fetch(`${runtimeConfig.public.apiBase + '/api' + url}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: hasAuth ? `Bearer ${data.value?.access_token}` : '',
    },
    method,
    body,
    params,
  });
};
