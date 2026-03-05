import { isArray, isInstanceOf } from "@root/utils/is.util";

export default function fromObjectToFormData(object: any): FormData {
  const formData: FormData = new FormData();

  for(let key in object) {
    const value: any = object[key];

    if((isArray(value) || isInstanceOf(value, FileList)) && value.length) {
      for(let index: number = 0; index < value.length; index++) {
        if(isArray(value)) {
          formData.append(value[index].name, value[index]);
        }

        if(isInstanceOf(value, FileList)) {
          const file: File = value.item(index)!;

          formData.append(file.name, file);
        }
      }
    } else {
      formData.append(key, value);
    }
  }

  return formData;
};
