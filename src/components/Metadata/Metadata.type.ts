export type MetadataProps = {
  /**
   *  @description must be used with `content` prop.
   */
  name?:      NameAttribute
  /**
   *  @description must be used with `content` prop.
   */
  httpEquiv?: HTTPEquipAttribute
  content?:   string
  title?:     string
  charset?:   CharsetAttribute
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
