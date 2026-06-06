import type { MouseEvent, ReactNode, RefObject } from "react";
import type { FormattedTime } from "@util/formatters/formatters.type";
import type { MediaControlsProps } from "./Media-Controls.type";

import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon, Volume2Icon, VolumeXIcon } from "lucide-react";

import scss from "./Media-Controls.module.scss";

import RangeBar from "./components/Range-Bar.component";

import { formatSecondsToTime, formatLeadingZeroCount } from "@util/formatters/formatters.util";

function calcProgress(mouseX: number, rect: DOMRect): number {
  const progress: number = (~~(mouseX - rect.left) / rect.width);
  return Math.max(Math.min(progress, 1.0), 0.0);
};

export default function MediaControls({ elementRef }: MediaControlsProps): ReactNode {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isMetadataLoaded, setIsMetadataLoaded] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0.0);
  const [currentVolume, setCurrentVolume] = useState<number>(0.0)

  let formattedCurrentTimeRef: RefObject<FormattedTime> = useRef<FormattedTime>(formatSecondsToTime(currentTime));
  let formattedDurationRef: RefObject<FormattedTime> = useRef<FormattedTime>(formatSecondsToTime(elementRef.current?.duration || 0));
  let timeProgressRef: RefObject<number> = useRef<number>(0);

  const changeIsPlaying = (): void => {
    setIsPlaying((prev: boolean) => {
      const newIsPlaying: boolean = !prev;

      if(newIsPlaying) {
        elementRef.current!.play();
      } else {
        elementRef.current!.pause();
      }

      return newIsPlaying;
    });
  };

  const changeIsMuted = (): void => {
    setIsMuted((prev: boolean) => {
      const newIsMuted: boolean = !prev;
      elementRef.current!.muted = newIsMuted;
      return newIsMuted;
    });
  };

  const changeCurrentTime = (event: MouseEvent<HTMLDivElement>, rect: DOMRect) => {
    const { clientX } = event;
    const progress: number = calcProgress(clientX, rect);
    const newTime: number = elementRef.current!.duration * progress;
    
    timeProgressRef.current = progress;
    elementRef.current!.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const changeCurrentVolume = (event: MouseEvent<HTMLDivElement>, rect: DOMRect): void => {
    const { clientX } = event;
    const newVolume: number = calcProgress(clientX, rect);

    elementRef.current!.volume = newVolume;
    setCurrentVolume(newVolume); 
  };

  useEffect(() => {
    function mediaEnded(): void {
      setIsPlaying(false);
    };

    function mediaMetadataLoaded(): void {
      formattedDurationRef.current = formatSecondsToTime(elementRef.current?.duration || 0);
      timeProgressRef.current = elementRef.current!.currentTime / elementRef.current!.duration;
      setCurrentTime(0.0);
      setCurrentVolume(elementRef.current!.volume);
      setIsMetadataLoaded(true);
    };

    function mediaTimeUpdated(): void {
      formattedCurrentTimeRef.current = formatSecondsToTime(elementRef.current?.currentTime || 0);
      timeProgressRef.current = elementRef.current!.currentTime / elementRef.current!.duration;
      setCurrentTime(elementRef.current!.currentTime);
    };

    if(elementRef.current) {
      elementRef.current.addEventListener("ended", mediaEnded);
      elementRef.current.addEventListener("loadedmetadata", mediaMetadataLoaded);
      elementRef.current.addEventListener("timeupdate", mediaTimeUpdated);
    }

    return () => {
      elementRef.current?.removeEventListener("ended", mediaEnded);
      elementRef.current?.removeEventListener("loadedmetadata", mediaMetadataLoaded);
      elementRef.current?.removeEventListener("timeupdate", mediaTimeUpdated);
    };
  }, []);

  return(
    <div className={scss.media_controls_container}>
      <section className={scss.media_data_container}>
        {isPlaying ?
        <button aria-label="Play Media" onClick={changeIsPlaying}>
          <PauseIcon size={28} strokeWidth={1.25}/>
        </button> :
        <button aria-label="Pause Media" onClick={changeIsPlaying}>
          <PlayIcon size={28} strokeWidth={1.25}/>
        </button>}
        <p className={scss.media_time}>
          {formatLeadingZeroCount(formattedCurrentTimeRef.current.h, 2)}:
          {formatLeadingZeroCount(formattedCurrentTimeRef.current.m, 2)}:
          {formatLeadingZeroCount(formattedCurrentTimeRef.current.s, 2)}
        </p>
        <p>/</p>
        <p className={scss.media_time}>
          {formatLeadingZeroCount(formattedDurationRef.current.h, 2)}:
          {formatLeadingZeroCount(formattedDurationRef.current.m, 2)}:
          {formatLeadingZeroCount(formattedDurationRef.current.s, 2)}
        </p>
        <RangeBar 
          onClick={changeCurrentTime} 
          onTrackMove={changeCurrentTime} 
          value={timeProgressRef.current}
          isMetadataLoaded={isMetadataLoaded}/>
      </section>
      <section className={scss.media_data_container}>
        {isMuted ?
        <button aria-label="Mute Media" onClick={changeIsMuted}>
          <VolumeXIcon size={28} strokeWidth={1.25}/>
        </button> :
        <button aria-label="Unmute Media" onClick={changeIsMuted}>
          <Volume2Icon size={28} strokeWidth={1.25}/>
        </button>}
      <RangeBar 
        onClick={changeCurrentVolume} 
        onTrackMove={changeCurrentVolume} 
        value={currentVolume}
        isMetadataLoaded={isMetadataLoaded}/> 
      </section>
    </div>
  );
};
