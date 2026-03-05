export default function inObject<O>(keys?: (keyof O)[] | null, object?: any | null): boolean {
	if(!object || !keys) {
		return false;
	}

	let index: number = 0;

	const length: number = keys.length;

  while(index < length) {
    if(Object.hasOwn(object, keys[index])) {
			return true;
		}

    index++;
  }

  return false;
};