import { isArray, isInstanceOf, isObject, isUndefined } from "./is.util";

export function fromObjectToFormData(object?: Record<any, any>): FormData {
  const formData: FormData = new FormData();

  if(!object) {
    return formData;
  }

  for(let key in object) {
    const value = object[key];
    
    if(!isUndefined(value) && isArray(value)) {
      appendArray(formData, key, value);
    } else if(!isUndefined(value) && isInstanceOf(value, FileList)) {
      appendFileList(formData, key, value);
    } else if(!isUndefined(value) && isObject(value)) {
      appendObject(formData, key, value);
    } else {
      formData.append(key, value);
    }
  }

  return formData;
};

function appendObject(formData: FormData, prefix: string, object: any): void {
  for(let name in object) {
    const value = object[name];
    const key = `${prefix}.${name}`;
    
    if(!isUndefined(value) && isArray(value)) {
      appendArray(formData, key, value);
    } else if(!isUndefined(value) && isInstanceOf(value, FileList)) {
      appendFileList(formData, key, value);
    } else if(!isUndefined(value) && isObject(value)) {
      appendObject(formData, key, value);
    } else {
      formData.append(key, value);
    }
  }
};

function appendArray(formData: FormData, key: string, value: any[]): void {
  formData.append(key, JSON.stringify(value));
};

function appendFileList(formData: FormData, key: string, value: FileList): void {
  for(let index: number = 0; index < value.length; index++) {
    const file: File = value.item(index)!;
    formData.append(key, file, file.name);
  }
};
