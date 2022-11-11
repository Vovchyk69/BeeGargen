import * as Models from '../../models';

type Props = {
  type: Models.ActionTypes.playerActions;
  audio?: HTMLAudioElement,
  payload?: AudioItem & string;
}

const INITIAL_STATE: PlayerState = {
  status: undefined,
  audio: undefined,
  data: undefined,
};

export default (state = INITIAL_STATE, { type, payload, audio }: Props) => {
  switch (type) {
    case Models.ActionTypes.playerActions.PLAY_AUDIO:
      state.audio?.play()
      return {
        ...state,
        status: state.data?.src ? 'play' : undefined
      };
    case Models.ActionTypes.playerActions.PAUSE_AUDIO:
      state.audio?.pause()
      return {
        ...state,
        status: state.data?.src ? 'pause' : undefined
      };
    case Models.ActionTypes.playerActions.STOP_AUDIO:
      if (state.audio) {
        state.audio.pause();
        state.audio.currentTime = 0;
      }
      return {
        ...state,
        status: state.data?.src ? 'stop' : undefined
      };
    case Models.ActionTypes.playerActions.SET_AUDIO:
      if (state.audio) {
        state.audio.pause();
        state.audio.currentTime = 0;
      }
      return {
        ...state,
        audio,
        status: payload?.src ? 'stop' : undefined,
        data: payload,
      };
    default:
      return state;
  }
};
