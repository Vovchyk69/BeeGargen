import * as Models from "../../models";

const cases: Models.Images.Cases = {
  [Models.ActionTypes.imagesActions.ADD_IMAGE_SUCCESS]: (state, payload) => ({
    current: payload || state.current,
    all: [payload!, ...state.all].filter(Boolean)
  }),
  [Models.ActionTypes.imagesActions.DEL_IMAGE_SUCCESS]: (state, payload) => ({
    current: state.current === payload ? undefined : state.current,
    all: state.all?.filter(r => r !== payload)
  }),
};

export default function(state: Models.Images.Store = {}, { type, payload }): Models.Images.Store {
  return { ...state, ...(cases[type] && cases[type]!(state, payload)) };
}
