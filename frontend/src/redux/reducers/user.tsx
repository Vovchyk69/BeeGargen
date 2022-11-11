import * as Models from "../../models";

const cases: Models.User.Cases = {
  [Models.ActionTypes.userActions.GET_USER_SUCCESS]: (state, payload) => ({
    current: payload || state.current
  })
};

export default function(state: Models.User.Store = {}, { type, payload }): Models.User.Store {
  return { ...state, ...(cases[type] && cases[type]!(state, payload)) };
}
