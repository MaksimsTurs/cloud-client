import FILE_TYPES from "@root/const/FILE-TYPES.const";

export function isText(filename: string): boolean {
  const extention: string = filename.substring(filename.lastIndexOf(".") + 1, filename.length);
  return FILE_TYPES.EXTENTIONS.TEXT_FILES.has(extention);
};

export function isImage(filename: string): boolean {
  const extention: string = filename.substring(filename.lastIndexOf(".") + 1, filename.length);
  return FILE_TYPES.EXTENTIONS.IMAGE_FILES.has(extention);
};

export function isVideo(filename: string): boolean {
  const extention: string = filename.substring(filename.lastIndexOf(".") + 1, filename.length);
  return FILE_TYPES.EXTENTIONS.VIDEO_FILES.has(extention);
};

export function isAudio(filename: string): boolean {
  const extention: string = filename.substring(filename.lastIndexOf(".") + 1, filename.length);
  return FILE_TYPES.EXTENTIONS.AUDIO_FILES.has(extention);
};
