export default function hasKey(key: string, obj?: Record<string, any>): boolean {
  if(!obj) {
    return false;
  }

  return Object.hasOwn(obj, key);
};