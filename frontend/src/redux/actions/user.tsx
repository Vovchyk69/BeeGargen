import * as Models from "../../models";

export const getUser: Models.User.Actions.GetUser = () => async dispatch =>
  new Promise((resolve, reject): void => { dispatch({
    type: Models.ActionTypes.userActions.GET_USER_REQUEST,
    payload: { resolve, reject }
  })});
