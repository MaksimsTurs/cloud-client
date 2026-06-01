import type { MouseEvent, ReactNode, RefObject } from "react";
import type { RangeBarProps } from "../Media-Controls.type";

import { useRef, useEffect } from "react";

import scss from "../scss/Range-Bar.module.scss";

export default function RangeBar({ onClick, onTrackMove, isMetadataLoaded, value }: RangeBarProps): ReactNode {
  const rangeBarRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  const rangeBarRectRef: RefObject<DOMRect | null> = useRef<DOMRect>(null);

  const onClickWapper = (event: MouseEvent<HTMLDivElement>): void => {
    onClick(event, rangeBarRectRef.current!);
  };

  useEffect(() => {
    function onTrackMoveWrapper(event: any): void {
      onTrackMove(event, rangeBarRectRef.current!);
    };

    function captureTrack(): void {
      document.addEventListener("mousemove", onTrackMoveWrapper);
    };

    function uncaptureTrack(): void {
      document.removeEventListener("mousemove", onTrackMoveWrapper);
    };

    if(rangeBarRef.current && isMetadataLoaded) {
      rangeBarRectRef.current = rangeBarRef.current.getBoundingClientRect();
      rangeBarRef.current.addEventListener("mousedown", captureTrack);
      document.addEventListener("mouseup", uncaptureTrack);
    }

    return() => {
      rangeBarRef.current?.removeEventListener("mousedown", captureTrack);
      document.removeEventListener("mouseup", uncaptureTrack);
      document.removeEventListener("mousemove", onTrackMoveWrapper);
    };
  }, [isMetadataLoaded]);

  return(
    <div ref={rangeBarRef} className={scss.range_bar_container} onClick={onClickWapper}>
      <div style={{ width: `${value * 100}%` }} className={scss.range_bar}></div>
    </div>
  );
};
