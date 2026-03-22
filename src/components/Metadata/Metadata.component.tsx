import type { ReactNode } from "react";
import type { MetadataProps } from "./Metadata.type";

import { isUndefined } from "@util/is.util";

export default function Metadata({ name, httpEquiv, charset, content, title }: MetadataProps): ReactNode {
  if(title) {
    return <title>{title}</title>;
  }

  if(name) {
    if(isUndefined(content)) {
      throw new Error("'content' prop must be defined when using 'name' prop!");
    }

    return <meta name={name} content={content}/>;
  }

  if(httpEquiv) {
    if(isUndefined(content)) {
      throw new Error("'httpEquiv' prop must be defined when using 'name' prop!");
    }

    return <meta name={httpEquiv} content={content}/>;
  }

  if(charset) {
    return <meta charSet={charset}/>
  }

  return null;
};
