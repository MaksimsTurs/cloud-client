export default function getParamsFromPath<P extends string>(pattern: string, path: string): Partial<Record<P, string>> {
  const params: Partial<Record<P, string>> = {};

  const patternParts: string[] = pattern.split("/");
  const pathParts: string[] = path.split("/");

  if(patternParts.length !== pathParts.length) {
    throw new Error(`Path pattern "${pattern}" does not match path "${path}"!`);
  }

  for(let index = 0; index < patternParts.length; index++) {
    if(/\:/.test(patternParts[index])) {
      const name = patternParts[index].replace(/\:/, "").trim();

      params[name as P] = pathParts[index];
    } else if(patternParts[index] !== pathParts[index]) {
      throw new Error(`Path pattern "${pattern}" does not match path "${path}"!`);
    }
  }

  return params;
};
