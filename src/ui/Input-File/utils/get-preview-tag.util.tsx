import { ReactNode } from "react";

import { isMimeTypeAudio, isMimeTypeBinary, isMimeTypeImage, isMimeTypeText, isMimeTypeVideo } from "@util/is.util";

import { BinaryIcon, HeadphonesIcon, TextInitialIcon } from "lucide-react";

export default function getPreviewTag(mimeType: string, src: string): ReactNode {
  if(isMimeTypeVideo(mimeType)) {
    return <video src={src}/>;
  }

  if(isMimeTypeImage(mimeType)) {
    return <img src={src}/>;
  }

  if(isMimeTypeText(mimeType)) {
    return <TextInitialIcon size={42} strokeWidth={1}/>;
  }

  if(isMimeTypeAudio(mimeType)) {
    return <HeadphonesIcon size={42} strokeWidth={1}/>;
  }

  if(isMimeTypeBinary(mimeType)) {
    return <BinaryIcon size={42} strokeWidth={1}/>;
  }
};
