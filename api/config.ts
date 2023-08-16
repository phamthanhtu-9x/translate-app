const {data} = useAuth();
const runtimeConfig = useRuntimeConfig();

export const apiBase = () => {
  return runtimeConfig.public.apiBase;
};
export const token = () => {
  if (data) {
    return data.value?.access_token;
  }
  return '';
};
