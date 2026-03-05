export default function formatUrl(base: string | undefined, url: string): string {
	return base ? `${base}${url}` : url;
};