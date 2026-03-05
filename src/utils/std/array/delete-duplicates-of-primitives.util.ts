import type { JSPrimitiveTypes } from "@root/global.type";

export default function deleteDuplicatesOfPrimitives(array: JSPrimitiveTypes[], keysToRemove: Set<JSPrimitiveTypes>): JSPrimitiveTypes[] {
	const length: number = array.length;
	const existingPrimitives: Set<JSPrimitiveTypes> = new Set<JSPrimitiveTypes>();

	if(!array.length) {
		return [];
	}

	let cleanArray: JSPrimitiveTypes[] = [];
	let index: number = 0;
	
	while(index < length) {
		const primitive: JSPrimitiveTypes = array[index];

		if(keysToRemove.has(primitive) && !existingPrimitives.has(primitive)) {
			cleanArray.push(primitive);
			existingPrimitives.add(primitive);
		}
		
		index++
  }

  return cleanArray;
};