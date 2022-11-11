import * as Models from "../../models";

export const getMedia: Models.Media.Actions.GetMedia = id => async dispatch =>
  new Promise((resolve, reject): void => { dispatch({
    type: Models.ActionTypes.mediaActions.GET_MEDIA_REQUEST,
    payload: { resolve, reject, id }
  })});

export const addMedia: Models.Media.Actions.AddMedia = data => async dispatch =>
  new Promise((resolve, reject): void => { dispatch({
    type: Models.ActionTypes.mediaActions.ADD_MEDIA_REQUEST,
    payload: { resolve, reject, data }
  })});

export const delMedia: Models.Media.Actions.DelMedia = id => async dispatch =>
  new Promise((resolve, reject): void => { dispatch({
    type: Models.ActionTypes.mediaActions.DEL_MEDIA_REQUEST,
    payload: { resolve, reject, id }
  })});

export const getMediaResources: Models.Media.Actions.GetMediaResources = id => async dispatch =>
  new Promise((resolve, reject): void => { dispatch({
    type: Models.ActionTypes.mediaActions.GET_MEDIA_RESOURCES_REQUEST,
    payload: { resolve, reject, id }
  })});

export const updMediaResource: Models.Media.Actions.UpdMediaResource = data => async dispatch =>
  new Promise((resolve, reject): void => { dispatch({
    type: Models.ActionTypes.mediaActions.UPD_MEDIA_RESOURCE_REQUEST,
    payload: { resolve, reject, data }
  })});
