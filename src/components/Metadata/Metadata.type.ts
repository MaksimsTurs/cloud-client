export type MetadataProps = {
  title?: string
  name?: NameAttribute
  charset?: CharsetAttribute
  httpEquiv?: HTTPEquipAttribute
  content?: string
};

type NameAttribute = 
  "description"      |
  "application-name" |
  "author"           |
  "color-sheme"      |
  "generator"        | 
  "referrer"         |
  "keywords"         |
  "theme-color"      |
  "viewport"         |
  "creator"          |
  "googlebot"        |
  "publisher"        |
  "robots";

type CharsetAttribute = "utf-8";

type HTTPEquipAttribute = 
  "content-type"            | 
  "content-security-policy" | 
  "default-style"           |
  "refresh";
