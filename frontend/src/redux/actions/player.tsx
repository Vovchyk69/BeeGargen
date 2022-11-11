import { Dispatch } from "redux";
import * as Models from "../../models";

export type DispatchSetAudio = (
  audio: PlayerState["data"]
) => (dispatch: Dispatch) => Promise<HTMLAudioElement>;
export type DispatchControlAudio = () => (dispatch: Dispatch) => void;

export const setAudio: DispatchSetAudio = (audio) => (dispatch) => {
  return new Promise((resolve) => {
    const audioEl = new Audio(audio!.src);
    dispatch({
      type: Models.ActionTypes.playerActions.SET_AUDIO,
      audio: audioEl,
      payload: audio,
    });
    audioEl.addEventListener("ended", () => {
      stopAudio()(dispatch);
    });
    audioEl.addEventListener("loadeddata", () => {
      resolve(audioEl);
    });
  });
};

export const playAudio: DispatchControlAudio = () => (dispatch) => {
  dispatch({ type: Models.ActionTypes.playerActions.PLAY_AUDIO });
};

export const pauseAudio: DispatchControlAudio = () => (dispatch) => {
  dispatch({ type: Models.ActionTypes.playerActions.PAUSE_AUDIO });
};

export const stopAudio: DispatchControlAudio = () => (dispatch) => {
  dispatch({ type: Models.ActionTypes.playerActions.STOP_AUDIO });
};
