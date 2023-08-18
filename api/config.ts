type ApiProps = {
  url: string;
  method: any;
  params?: any;
  body?: any;
  hasAuth: boolean;
}

export const api = (props: ApiProps) => {
  const {url, method, hasAuth, params, body} = props;
  const runtimeConfig = useRuntimeConfig();
  const {data} = useAuth();

  return $fetch(`${runtimeConfig.public.apiBase + '/api' + url}`, {
    headers: {
      Authorization: hasAuth ? `Bearer ${data.value?.access_token}` : '',
    },
    method,
    body,
    params
  });
};
