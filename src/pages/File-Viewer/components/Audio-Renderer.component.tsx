import type { ReactNode, RefObject } from "react";
import type { AudioRendererProps } from "../Page.type";

import { useEffect, useRef } from "react";

import MediaControls from "@ui/Media-Controls/Media-Controls.component";

export default function AudioRenderer({ data }: AudioRendererProps): ReactNode {
  const audioRef: RefObject<HTMLAudioElement | null> = useRef<HTMLAudioElement | null>(null);

  const bytes: Uint8Array<ArrayBuffer> = new Uint8Array(data.buffer.data);
  const blob: Blob = new Blob([bytes.buffer], { type: data.mime_type });
  const url: string = URL.createObjectURL(blob);

  useEffect(() => {
    return() => {
      URL.revokeObjectURL(url);
    };
  }, []);

  return(
    <div>
      <audio ref={audioRef} src={url}/>
      <MediaControls elementRef={audioRef}/>
    </div>
  );
};
