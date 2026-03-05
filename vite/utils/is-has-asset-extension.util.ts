export default function isHasAssetExtension(extension: string, path: string): boolean {
  return new RegExp(`.${extension}`).test(path);
};