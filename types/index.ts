export type Language = {
  name: string;
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