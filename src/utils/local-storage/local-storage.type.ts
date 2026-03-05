export type LocalStorageUil = {
  get:    <T = any>(key: string, defaultValue?: string) => T | null
  set:    <T = any>(key: string, value: T) => void
  remove: (key: string) => void
}
