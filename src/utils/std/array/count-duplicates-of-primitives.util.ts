import type { JSPrimitiveTypes, Dictionary } from "@root/global.type";

export default function countDuplicatesOfPrimitives(array: JSPrimitiveTypes[], keysToCount: Set<JSPrimitiveTypes>): Dictionary<string, number> {
	const count: Dictionary<string, number> = {};
	const length: number = array.length;

	let index: number = 0;

	while(index < length) {
		const primitive: JSPrimitiveTypes = array[index];

		if(keysToCount.has(primitive)) {
			count[primitive as keyof typeof count] ? 
				count[primitive as keyof typeof count]!++ : 
				count[primitive as keyof typeof count] = 1;
		}

		index++;
	}

	return count;
};