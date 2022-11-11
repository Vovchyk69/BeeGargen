import * as Models from "../../models";

const cases: Models.Resource.Cases = {
  [Models.ActionTypes.resourceActions.GET_RESOURCE_SUCCESS]: (state, payload) => ({
    current: payload || state.current,
  }),
  [Models.ActionTypes.resourceActions.GET_RESOURCES_SUCCESS]: (state, payload) => ({
    all: payload || state.all
  }),
  [Models.ActionTypes.resourceActions.ADD_RESOURCE_SUCCESS]: (state, payload) => ({
    current: payload || state.current,
    all: [payload!, ...state.all].filter(Boolean)
  }),
  [Models.ActionTypes.resourceActions.UPD_RESOURCE_SUCCESS]: (state, payload) => ({
    current: state.current?._id === payload._id ? payload : state.current,
    all: state.all?.map(r => r._id === payload._id ? payload : r)
  }),
  [Models.ActionTypes.resourceActions.DEL_RESOURCE_SUCCESS]: (state, payload) => ({
    current: state.current?._id === payload ? undefined : state.current,
    all: state.all?.filter(r => r._id !== payload)
  }),
};

export default function(state: Models.Resource.Store = {}, { type, payload }): Models.Resource.Store {
  return { ...state, ...(cases[type] && cases[type]!(state, payload)) };
}
