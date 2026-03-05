export default function isPathMatchPattern(pattern: string, path?: string): boolean {
  if(!/\:/g.test(pattern)) {
    return pattern === path;
  }

  if(!path) {
    return false;
  }

  const patternParts: string[] = pattern.split("/");
  const pathParts: string[] = path.split("/");

  if(patternParts.length != pathParts.length) {
    return false;
  }

  let dynamicPartsCount: number = 0;
  let staticPartsCount: number = 0;

  for(let index: number = 0; index < patternParts.length; index++) {
    if(/\:/.test(patternParts[index])) {
      dynamicPartsCount++;
    } else {
      if(patternParts[index] !== pathParts[index]) {
        return false;
      }

      staticPartsCount++;
    }
  }

  return (patternParts.length - dynamicPartsCount) === staticPartsCount;
};