import parse from "./parse.util";

export default function get(key: string | number): string | undefined {
	return parse()[key];
};