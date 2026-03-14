import type { HTTPProcessResponseAs } from "../http.type";

const PROCESS_ASS_POSSIBLE_VALUES: Set<HTTPProcessResponseAs> = new Set<HTTPProcessResponseAs>([
  "json", 
  "blob", 
  "arrayBuffer", 
  "text", 
  "bytes",
]);

export default PROCESS_ASS_POSSIBLE_VALUES;
