import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { playAudio, pauseAudio } from "@redux/actions";
import * as Models from "../../models";
import MinifiedPanel from "./MinifiedPanel";
import BigPanel from "./BigPanel";

export type Props = {};

const Player: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const [progress, setProgress] = React.useState(0);
  const [isExpanded, setExpand] = React.useState(false);

  const track: Models.App.IReducerStates["player"] = useSelector((store: Models.App.IReducerStates) => store.player);

  React.useEffect(() => {
    track.audio?.addEventListener('timeupdate', () => {
      const current = track.audio?.currentTime || 0
      const duration = track.audio?.duration || 0
      setProgress(duration && current / duration * 100)
    })
  }, [track.audio])

  function setIsPlaying(play: boolean) {
    if (play) {
      dispatch(playAudio());
    } else {
      dispatch(pauseAudio());
    }
  }

  function onChangeTime(time: number) {
    track.audio!.currentTime = time
  }

  function onTogglePanel() {
    setExpand(!isExpanded);
  }

  return (
    <section className="player relative flex flex-column flex-align-stretch flex-justify-stretch">
      {
        !!track.audio && <>
          <div role="button" className="mini-player" onClick={onTogglePanel}>
            <MinifiedPanel
              src={track.data?.img}
              text={track.data?.title}
              isExpanded={isExpanded}
              isPlaying={!track.audio?.paused}
              onTogglePlay={setIsPlaying}
            />
          </div>
          {
            isExpanded && (
              <BigPanel
                isPlaying={!track.audio?.paused}
                current={track.audio?.currentTime}
                duration={track.audio?.duration}
                onTogglePlay={setIsPlaying}
                onChangeTime={onChangeTime}
              />
            )
          }
        </>
      }

      {
        !isExpanded &&
        <hr
          className="bg-primary absolute"
          style={{ width: `${progress}%`, height: 2, top: 0, left: 0 }}
        />
      }
    </section>
  );
};

export default Player;
