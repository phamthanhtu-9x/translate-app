const {data} = useAuth();
const runtimeConfig = useRuntimeConfig();
interface ApiProps {
  url: string;
  method: any;
}

export const api = (props: ApiProps) => {
  const {url, method} = props;

  return $fetch(`${runtimeConfig.public.apiBase + '/api' + url} + `, {
    method,
    headers: {
      Authorization: `Bearer ${data.value?.access_token}`,
    },
  });
};
