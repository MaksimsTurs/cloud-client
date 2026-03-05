import type { ReactNode } from "react";

import scss from "../scss/File-Viewer-Loader.module.scss";

export default function FileViewerSkeleton(): ReactNode {
  return(
    <div className={scss.file_viewer_skeleton_container}>
      <div className={scss.file_viewer_skeleton_information}>
        <div className={scss.file_viewer_skeleton_information_section}>
          <p></p>
          <p style={{ width: "9rem" }}></p>
        </div>
        <div className={scss.file_viewer_skeleton_information_section}>
          <p></p>
          <p style={{ width: "8rem" }}></p>
        </div>
        <div className={scss.file_viewer_skeleton_information_section}>
          <p></p>
          <p style={{ width: "10rem" }}></p>
        </div>
        <div className={scss.file_viewer_skeleton_information_section}>
          <p></p>
          <p style={{ width: "7.5rem" }}></p>
        </div>
      </div>
      <div className={scss.file_viewer_skeleton_viewer}>
        <p></p>
      </div>
    </div>
  );
};
