import * as Models from "../../models";

const cases: Models.Media.Cases = {
  [Models.ActionTypes.mediaActions.GET_MEDIA_SUCCESS]: (state, payload) => ({
    current: payload || state.current,
  }),
  [Models.ActionTypes.mediaActions.ADD_MEDIA_SUCCESS]: (state, payload) => ({
    current: payload || state.current,
  }),
  [Models.ActionTypes.mediaActions.DEL_MEDIA_SUCCESS]: (state, payload) => ({
    current: state.current?._id === payload ? undefined : state.current,
  }),
  [Models.ActionTypes.mediaActions.GET_MEDIA_RESOURCES_SUCCESS]: (state, payload) => ({
    media_resources: payload,
  }),
  [Models.ActionTypes.mediaActions.UPD_MEDIA_RESOURCE_SUCCESS]: (state, payload) => ({
    media_resources: state.media_resources?.map(r => r._id === payload._id ? payload : r),
  }),
};

export default function(state: Models.Media.Store = {}, { type, payload }): Models.Media.Store {
  return { ...state, ...(cases[type] && cases[type]!(state, payload)) };
}
