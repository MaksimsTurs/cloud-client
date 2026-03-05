import { isText, isAudio, isImage, isVideo } from "./is.util";

import TextRenderer from "../components/Text-Renderer.component";
import ImageRenderer from "../components/Image-Renderer.component";
import VideoRenderer from "../components/Video-Renderer.component";
import AudioRenderer from "../components/Audio-Renderer.component";

export default function getRenderer(filename?: string) {
  if(!filename) {
    return undefined;
  }
    
  if(isText(filename)) {
    return TextRenderer;
  }

  if(isImage(filename)) {
    return ImageRenderer;
  }

  if(isVideo(filename)) {
    return VideoRenderer;
  }

  if(isAudio(filename)) {
    return AudioRenderer;
  }

  return undefined;
};
