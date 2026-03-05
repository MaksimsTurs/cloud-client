import type { ReactNode } from "react";
import type { MetadataProps } from "./Metadata.type";

export default function Metadata({ name, httpEquiv, charset, content, title }: MetadataProps): ReactNode {
  if(title) {
    return <meta title={title}/>
  }

  if(name && content) {
    return <meta name={name} content={content}/>
  }

  return <meta charSet={charset} httpEquiv={httpEquiv}/>;
};
