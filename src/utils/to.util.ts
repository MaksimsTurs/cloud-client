import { isInstanceOf, isArray, isObject } from "./is.util";

const appendFormData = (formData: FormData, key: string, value: any): void => {
  if(isInstanceOf(value, FileList)) {
    for(let file of value) {
      formData.append(key, file, file.name);
    }
  } else if(isArray(value) || isObject(value)) {
    formData.append(key, JSON.stringify(value))
  } else {
    formData.append(key, value?.toString());
  }
};

export function toFormDataFromObject<T = unknown>(obj: T): FormData {
  const formData = new FormData();

  for(let key in obj) {
    const value: any = obj[key];
    appendFormData(formData, key, value);
  }

  return formData;
};
