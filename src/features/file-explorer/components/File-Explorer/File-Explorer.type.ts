import type { FEItem} from "@feature/file-explorer/reducers/file-explorer/file-explorer.type";

export type FolderProps = {
  isSelected: boolean
  folder: FEItem 
};

export type FileProps = {
  isSelected: boolean
  file: FEItem
};
