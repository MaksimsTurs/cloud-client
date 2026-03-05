export default function remove(key: string): void {
	document.cookie = `${key}=`;
};