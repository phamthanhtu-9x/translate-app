<script setup lang="ts">
definePageMeta({middleware: 'auth'});
const {data} = useAuth();

const headers = {
	Authorization: `Bearer ${data.value.access_token}`,
};

const runtimeConfig = useRuntimeConfig();
const result = await useFetch(runtimeConfig.public.apiBase + '/api/auth/user', {headers});
console.log(result.data.value, runtimeConfig.public.apiBase + '/api/auth/user', headers);
</script>
<template>
	<div>Dashboard</div>
</template>
