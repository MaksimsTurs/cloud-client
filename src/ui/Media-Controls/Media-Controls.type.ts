import { MouseEvent, RefObject } from "react";

export type MediaControlsProps = {
  elementRef: RefObject<HTMLAudioElement | HTMLVideoElement | null>
};

export type RangeBarProps = {
  onClick: OnClick
  onTrackMove: OnTrackMove
  value: number
  isMetadataLoaded: boolean
};

type OnTrackMove = (event: MouseEvent<HTMLDivElement>, rect: DOMRect) => void;

type OnClick = (event: MouseEvent<HTMLDivElement>, rect: DOMRect) => void:
