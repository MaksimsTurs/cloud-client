import type { ReactNode } from "react";
import type { FileSettingFormProps } from "./File-Setting-Form.type";

import { 
  isMimeTypeText,
  isMimeTypeAudio,
  isMimeTypeBinary,
  isMimeTypeImage,
  isMimeTypeVideo 
} from "@util/is.util";

import ImageSettings from "./components/Image-Settings.component";
import AudioSettings from "./components/Audio-Settings.components";
import TextSettings from "./components/Text-Settings.component";
import VideoSettings from "./components/Video-Settings.component";
import BinarySettings from "./components/Binary-Settings.component";

export default function FileSettingForm({ 
  mimeType,
  onSubmit, 
  defaultValues 
}: FileSettingFormProps<any>): ReactNode {
  return(
    isMimeTypeImage(mimeType) ? <ImageSettings mimeType={mimeType} defaultValues={defaultValues} onSubmit={onSubmit}/> :
    isMimeTypeAudio(mimeType) ? <AudioSettings mimeType={mimeType} defaultValues={defaultValues} onSubmit={onSubmit}/> :
    isMimeTypeText(mimeType) ? <TextSettings mimeType={mimeType} defaultValues={defaultValues} onSubmit={onSubmit}/> :
    isMimeTypeVideo(mimeType) ? <VideoSettings mimeType={mimeType} defaultValues={defaultValues} onSubmit={onSubmit}/> :
    isMimeTypeBinary(mimeType) ? <BinarySettings mimeType={mimeType} defaultValues={defaultValues} onSubmit={onSubmit}/> :
    null
  );
};
