import type { FEItem, FEItemRecord } from "@feature/file-explorer/reducers/file-explorer/file-explorer.type";
import type { UseFEActionReturn } from "./use-file-explorer-items-events.type";
import type { KeyboardEvent, MouseEvent, RefObject } from "react";

import { useEffect, useRef, useState } from "react";

import { useFileExplorer, useFileExplorerHistory } from "@feature/file-explorer/file-explorer.feature";

import hasKey from "@feature/file-explorer/utils/has-key.util";

export default function useFileExplorerAction(): UseFEActionReturn {
  const [feItems, setFeItems] = useState<FEItemRecord>({});

  const fe = useFileExplorer();
  const feHistory = useFileExplorerHistory();

  const pressedKeys: RefObject<Set<string>> = useRef<Set<string>>(new Set<string>());

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
          setFeItems(items => ({...items, [itemId]: item }));
        } else {
          setFeItems(items => {
            const newItems = {...items };
            delete newItems[itemId];
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

  const handlePressedKeys = (event: KeyboardEvent<HTMLDivElement>): void => {
    if(isPressed("Escape")) {
      event.preventDefault();
      setFeItems({});
    } else if(event.ctrlKey && isPressed("c")) {
      event.preventDefault();
      fe.copy(feItems, feHistory.parent?.id);
      setFeItems({});
    } else if(event.ctrlKey && isPressed("d")) {
      event.preventDefault();
      fe.remove(feItems);
      setFeItems({});
    } else if(event.ctrlKey && isPressed("m")) {
      event.preventDefault();
      fe.move(feItems, feHistory.parent?.id);
      setFeItems({});
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
