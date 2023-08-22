export type ApiProps = {
  url: string;
  method: any;
  params?: any;
  body?: any;
  hasAuth: boolean;
}

export type Language = {
  name?: string;
  language: string;
}

export type TranslatePayLoad = {
	text: string,
	source: string,
	target: string,
}

export type FormDataPayLoad = {
	name?: string,
  email: string,
  password: string | number
}