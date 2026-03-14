import { HTTPConfig } from "../http.util.ts";

export default function formatUrl(path: string): string {
  if(HTTPConfig.base) {
    return `${HTTPConfig.base}${path}`;
  }

  return path;
};
