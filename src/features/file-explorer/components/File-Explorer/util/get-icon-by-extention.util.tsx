import type { ReactNode } from "react";

import { 
  FileIcon, 
  FileAudioIcon, 
  FileCode2Icon, 
  FileImageIcon, 
  FileJson2Icon, 
  FileVideoIcon, 
  DatabaseIcon,
  FileTerminalIcon
} from "lucide-react";

export default function getIconByExtention(name: string): ReactNode {
  const extention: string | undefined = name.split(".").at(-1);

  switch(extention) {
    case "mp4":
      return <FileVideoIcon size={25} strokeWidth={1}/>;
    case "json":
      return <FileJson2Icon size={25} strokeWidth={1}/>;
    case "mp3":
    case "ogg":
      return <FileAudioIcon size={25} strokeWidth={1}/>;
    case "jpg":
    case "jpeg":
    case "png":
    case "webp":
      return <FileImageIcon size={25} strokeWidth={1}/>;
    case "c":
    case "cpp":
    case "js":
    case "ts":
    case "py":
    case "html":
    case "xml":
    case "jsx":
    case "tsx":
      return <FileCode2Icon size={25} strokeWidth={1}/>;
    case "sql":
      return <DatabaseIcon size={25} strokeWidth={1}/>;
    case "sh":
    case "zsh":
    case "bat":
    case "cmd":
    case "ps1":
      return <FileTerminalIcon size={25} strokeWidth={1}/>
    default:
      return <FileIcon size={25} strokeWidth={1}/>;
  }
};
