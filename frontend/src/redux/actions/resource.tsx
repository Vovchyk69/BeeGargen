import * as Models from "../../models";

export const getResource: Models.Resource.Actions.GetResource = id => async dispatch =>
  new Promise((resolve, reject): void => { dispatch({
    type: Models.ActionTypes.resourceActions.GET_RESOURCE_REQUEST,
    payload: { resolve, reject, id }
  })});

export const getResources: Models.Resource.Actions.GetResources = () => async dispatch =>
  new Promise((resolve, reject): void => { dispatch({
    type: Models.ActionTypes.resourceActions.GET_RESOURCES_REQUEST,
    payload: { resolve, reject }
  })});

export const addResource: Models.Resource.Actions.AddResource = data => async dispatch =>
  new Promise((resolve, reject): void => { dispatch({
    type: Models.ActionTypes.resourceActions.ADD_RESOURCE_REQUEST,
    payload: { resolve, reject, data }
  })});

export const updResource: Models.Resource.Actions.UpdResource = data => async dispatch =>
  new Promise((resolve, reject): void => { dispatch({
    type: Models.ActionTypes.resourceActions.UPD_RESOURCE_REQUEST,
    payload: { resolve, reject, data }
  })});

export const delResource: Models.Resource.Actions.DelResource = id => async dispatch =>
  new Promise((resolve, reject): void => { dispatch({
    type: Models.ActionTypes.resourceActions.DEL_RESOURCE_REQUEST,
    payload: { resolve, reject, id }
  })});
