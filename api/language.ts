import {apiBase, token} from './config';

export const getAllLanguage = () => {
	return $fetch(
		`${apiBase()} + /api/allLangue`,
		{
			method: 'get',
			headers: {
				Authorization: `Bearer ${token()}`
			}
		}
	)
}
