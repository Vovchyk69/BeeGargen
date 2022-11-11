import * as Models from "../../models";

export const addImage: Models.Images.Actions.AddImage = data => async dispatch =>
  new Promise((resolve, reject): void => { dispatch({
    type: Models.ActionTypes.imagesActions.ADD_IMAGE_REQUEST,
    payload: { resolve, reject, data }
  })});

export const delImage: Models.Images.Actions.DelImage = data => async dispatch =>
  new Promise((resolve, reject): void => { dispatch({
    type: Models.ActionTypes.imagesActions.DEL_IMAGE_REQUEST,
    payload: { resolve, reject, data }
  })});
