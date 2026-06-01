import type { ReactNode, RefObject } from "react";
import type { VideoRendererProps } from "../Page.type";

import { useRef, useMemo } from "react";

import MediaControls from "@root/ui/Media-Controls/Media-Controls.component";

export default function VideoRenderer({ data }: VideoRendererProps): ReactNode {
  const videoRef: RefObject<HTMLVideoElement | null> = useRef<HTMLVideoElement | null>(null);

  const url: string = useMemo(() => {
    const bytes: Uint8Array<ArrayBuffer> = new Uint8Array(data.buffer.data);
    const blob: Blob = new Blob([bytes.buffer], { type: data.mime_type });
    
    return URL.createObjectURL(blob);
  }, [data]);  

  return(
    <div>
      <video ref={videoRef} src={url}/>
      <MediaControls elementRef={videoRef}/>
    </div>
  );
};
