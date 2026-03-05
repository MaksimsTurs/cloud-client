import useParams from "@root/hooks/use-react-router/use-params.hook";

import SideMenuContainer from "./components/Side-Menu-Container.component";
import SideMenuSection from "./components/Side-Menu-Section.component";
import Title from "@component/Title/Title.component";
import Empty from "@ui/Empty/Empty.component";
import FileViewerSkeleton from "./components/File-Viewer-Skeleton.component";

import { Fragment } from "react/jsx-runtime";

import getRenderer from "./utils/get-renderer.util";
import { isText } from "./utils/is.util";

import scss from "./Page.module.scss";

import { useFileExplorerGetFile } from "@feature/file-explorer/file-explorer.feature";

export default function FileViewer() {
  const { id } = useParams();
  const { data, isExist, isLoading } = useFileExplorerGetFile(id);

  const Renderer = getRenderer(data?.name);
  
  return(
    <Fragment>
      <Title>{data?.name || "Item Preview"}</Title>
      {isLoading ? <FileViewerSkeleton/> : isExist && Renderer ?
      <div className={scss.file_viewer_container}>
        <SideMenuContainer>
          <SideMenuSection  name="Id" value={data!.id}/>
          <SideMenuSection  name="Name" value={data!.name}/>
        </SideMenuContainer>
        {isText(data!.name) ?
        <div className={scss.file_text_viewer}><Renderer data={data!.buffer}/></div> :
        <div className={scss.file_media_viewer}><Renderer data={data!.id}/></div>}
      </div> :
      <Empty>File does not exist!</Empty>}
   </Fragment>
  );
};
