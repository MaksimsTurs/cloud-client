import type { AlertTypes } from "../Alert.type";

import { firstLetterToUpperCase } from "@util/std/std.util";

export default function getDefaultTitle(type: AlertTypes): string {
  return firstLetterToUpperCase(type) as string;
};
