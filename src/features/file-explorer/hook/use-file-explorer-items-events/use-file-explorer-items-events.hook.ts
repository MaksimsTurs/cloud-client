import type { FEItem, FEItemRecord } from "@feature/file-explorer/reducers/file-explorer/file-explorer.type";
import type { UseFEActionReturn } from "./use-file-explorer-items-events.type";
import type { KeyboardEvent, MouseEvent, RefObject } from "react";

import { useEffect, useRef, useState } from "react";

import { useFileExplorer, useFileExplorerHistory } from "@feature/file-explorer/file-explorer.feature";

import { isObjectEmpty } from "@util/is.util";
import hasKey from "@feature/file-explorer/utils/has-key.util";

export default function useFileExplorerAction(): UseFEActionReturn {
  const [feItems, setFeItems] = useState<FEItemRecord>({});

  const fe = useFileExplorer();
  const feHistory = useFileExplorerHistory();

  const pressedKeys: RefObject<Set<string>> = useRef<Set<string>>(new Set<string>());
  const feItemPaths: RefObject<Record<string, string>> = useRef({});

  const addKey = (key: string): void => {
    pressedKeys.current.add(key);
  };

  const deleteKey = (key: string): void => {
    pressedKeys.current.delete(key);
  };

  const isPressed = (key: string): boolean => {
    return pressedKeys.current.has(key);
  };

  // ctrl + right mouse click, select a itme.
  const onClickCapture = (event: MouseEvent<HTMLDivElement>): void => {
    if(event.ctrlKey) {
      event.stopPropagation();

      const target: HTMLElement = event.target as HTMLElement;
      const itemId: string | undefined = target.dataset.itemId;
      const item: FEItem | undefined = feHistory.getItem(itemId);

      if(item && itemId) {
        if(event.ctrlKey && !hasKey(itemId, feItems)) {
          setFeItems(items => {
            feItemPaths.current[itemId] = feHistory.path;
            return {...items, [itemId]: item };
          });
        } else {
          setFeItems(items => {
            const newItems = {...items };

            delete newItems[itemId];
            delete feItemPaths.current[itemId]; 

            return newItems;
          });
        }
      }
    };
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    addKey(event.key);
    handlePressedKeys(event);
  };

  const onKeyUp = (event: KeyboardEvent<HTMLDivElement>): void => {
    deleteKey(event.key);
  };

  const handlePressedKeys = async (event: KeyboardEvent<HTMLDivElement>): Promise<void> => { 
    if(!isObjectEmpty(feItems)) {
      event.preventDefault();
      
      if(isPressed("Escape")) {
        setFeItems({});
        feItemPaths.current = {};
      } else if(event.ctrlKey && isPressed("c")) {
        await fe.copy(feItems, feHistory.parent?.id);
        setFeItems({});
        feItemPaths.current = {};
      } else if(event.ctrlKey && isPressed("d")) {
        await fe.remove(feItems, feItemPaths.current);
        feItemPaths.current = {};
        setFeItems({});
      } else if(event.ctrlKey && isPressed("m")) {
        await fe.move(feItems, feItemPaths.current, feHistory.parent?.id);
        feItemPaths.current = {};
        setFeItems({});
      }
    }
  };

  useEffect(() => {
    const _onClickCapture: EventListener = onClickCapture as unknown as EventListener;
    const _onKeyDown: EventListener = onKeyDown as unknown as EventListener;
    const _onKeyUp: EventListener = onKeyUp as unknown as EventListener;

    document.addEventListener("click", _onClickCapture, { capture: true });
    document.addEventListener("keydown", _onKeyDown);
    document.addEventListener("keyup", _onKeyUp);
    
    return () => {
      document.removeEventListener("click", _onClickCapture, { capture: true });
      document.removeEventListener("keydown", _onKeyDown);
      document.removeEventListener("keyup", _onKeyUp);
    };
  }, [feItems, feHistory.path, feHistory.items]);

  return {
    selected: feItems
  };
};
