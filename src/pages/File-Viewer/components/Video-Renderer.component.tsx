import type { ReactNode, RefObject } from "react";
import type { VideoRendererProps } from "../Page.type";

import { useEffect, useRef } from "react";

import MediaControls from "@ui/Media-Controls/Media-Controls.component";

import scss from "../scss/Video-Renderer.module.scss";

export default function VideoRenderer({ data }: VideoRendererProps): ReactNode {
  const videoRef: RefObject<HTMLVideoElement | null> = useRef<HTMLVideoElement | null>(null);

  const bytes: Uint8Array<ArrayBuffer> = new Uint8Array(data.buffer.data);
  const blob: Blob = new Blob([bytes.buffer], { type: data.mime_type });
  const url: string = URL.createObjectURL(blob);

  useEffect(() => {
    return() => {
      URL.revokeObjectURL(url);
    };
  }, []);

  return(
    <div className={scss.video_renderer}>
      <video ref={videoRef} src={url}/>
      <MediaControls elementRef={videoRef}/>
    </div>
  );
};
