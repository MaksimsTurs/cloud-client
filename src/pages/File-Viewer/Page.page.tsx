import useParams from "@root/hooks/use-react-router/use-params.hook";

import SideMenuContainer from "./components/Side-Menu-Container.component";
import SideMenuSection from "./components/Side-Menu-Section.component";
import Metadata from "@component/Metadata/Metadata.component";
import Empty from "@ui/Empty/Empty.component";
import FileViewerSkeleton from "./components/File-Viewer-Skeleton.component";
import ImageRenderer from "./components/Image-Renderer.component";
import VideoRenderer from "./components/Video-Renderer.component";
import AudioRenderer from "./components/Audio-Renderer.component";
import TextRenderer from "./components/Text-Renderer.component";

import { Fragment } from "react/jsx-runtime";

import { 
  isMimeTypeText, 
  isMimeTypeImage, 
  isMimeTypeVideo, 
  isMimeTypeAudio, 
} from "@util/is.util";

import scss from "./Page.module.scss";

import { useFileExplorerGetFile } from "@feature/file-explorer/file-explorer.feature";

export default function FileViewer() {
  const { id } = useParams();
  const { data, isExist, isLoading } = useFileExplorerGetFile(id);

  return(
    <Fragment>
      <Metadata  title={data?.name || "Preview"}/>
      {isLoading ? <FileViewerSkeleton/> : data && isExist ?
      <div className={scss.file_viewer_container}>
        <SideMenuContainer>
          <SideMenuSection  name="Id" value={data!.id}/>
          <SideMenuSection  name="Name" value={data!.name}/>
          <SideMenuSection  name="Mime Type" value={data!.mime_type}/>
        </SideMenuContainer>
        <div className={scss.file_media_viewer}>
          {isMimeTypeImage(data.mime_type) ? <ImageRenderer data={data}/> :
           isMimeTypeVideo(data.mime_type) ? <VideoRenderer data={data}/> :
           isMimeTypeAudio(data.mime_type) ? <AudioRenderer data={data}/> :
           isMimeTypeText(data.mime_type) ? <TextRenderer data={data}/> : null} 
        </div>
      </div> :
      <Empty
        header="File not found!"
        main={`Looks like file ${id} does not exist!`}/>}
   </Fragment>
  );
};
