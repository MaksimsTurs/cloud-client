import { isUndefined } from "@util/is.util";

export default function isUserTryRemoveFromUnsecureLocation(fullItemPath: string, currentPath: string[]): boolean {
  const fullItemPathSplit: string[] = fullItemPath.split("/");

  if(fullItemPathSplit.length === currentPath.length) {
    for(let index: number = 0; index < currentPath.length; index++) {
      if(fullItemPathSplit[index] != currentPath[index]) {
        return false;
      }
    }

    return true;
  }

  if(fullItemPathSplit.length < currentPath.length) {
    for(let index: number = 0; index < currentPath.length; index++) {
      if(isUndefined(fullItemPathSplit[index])) {
        return true;
      }
      
      if(fullItemPathSplit[index] != currentPath[index]) {
        return false;
      }
    }
  }

  return false;
};

