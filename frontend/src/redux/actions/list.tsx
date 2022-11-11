import * as Models from "../../models";

export const fetchList: Models.App.DispatchAction = () => async dispatch =>
  new Promise(
    (resolve, reject): void => {
      dispatch({
        type: Models.ActionTypes.listActions.FETCH_LIST_REQUEST,
        payload: { resolve, reject }
      });
    }
  );
