import type { AlertTypes } from "../Alert.type";

export default function formatTitle(type: AlertTypes): string {
  return type.toUpperCase();
};
