const MAX_FILES_COUNT: number = 10;
const MAX_FILE_SIZE: number = 1e+8;
const UNSUPPORTED_FILE_TYPES: Set<string> = new Set<string>([
 "application/x-msdownload",
 "application/octet-stream",
 "application/x-msi",
 "application/vnd.microsoft.portable-executable",
 "application/java-archive"
]);

export default function validateFiles(files: FileList): string | undefined {
  if(files.length > MAX_FILES_COUNT) {
    return "You can upload only 10 files at once!";
  }

  for(let index: number = 0; index < files.length; index++) {
    const file: File = files.item(index)!;

    if(!file.type || UNSUPPORTED_FILE_TYPES.has(file.type)) {
      return `${file.name} file has unsupported format!`;
    }

    if(file.size > MAX_FILE_SIZE) {
      return `${file.name} is to big!`;
    }
  }
};
