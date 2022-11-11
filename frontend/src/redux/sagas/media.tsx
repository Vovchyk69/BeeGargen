import { takeLatest, call, put } from "redux-saga/effects";
import * as Models from "../../models";
import { API } from "../../services";

export default [
  takeLatest(Models.ActionTypes.mediaActions.GET_MEDIA_REQUEST, getMedia),
  takeLatest(Models.ActionTypes.mediaActions.ADD_MEDIA_REQUEST, addMedia),
  takeLatest(Models.ActionTypes.mediaActions.DEL_MEDIA_REQUEST, delMedia),
  takeLatest(Models.ActionTypes.mediaActions.GET_MEDIA_RESOURCES_REQUEST, getMediaResources),
  takeLatest(Models.ActionTypes.mediaActions.UPD_MEDIA_RESOURCE_REQUEST, updMediaResource),
];

function* getMedia({ payload: { resolve, reject, id } }: Models.Media.Sagas.GetMedia) {
  try {
    const payload = yield call(API.getMedia.bind(API), id);

    resolve(payload);
    yield put({ type: Models.ActionTypes.mediaActions.GET_MEDIA_SUCCESS, payload });
  } catch (error) {
    reject(error);
    yield put({ type: Models.ActionTypes.mediaActions.GET_MEDIA_FAILURE, payload: error });
  }
}

function* addMedia({ payload: { resolve, reject, data } }: Models.Media.Sagas.AddMedia) {
  try {
    const payload = yield call(API.createMedia.bind(API), data);

    resolve(payload);
    yield put({ type: Models.ActionTypes.mediaActions.ADD_MEDIA_SUCCESS, payload });
  } catch (error) {
    reject(error);
    yield put({ type: Models.ActionTypes.mediaActions.ADD_MEDIA_FAILURE, payload: error });
  }
}

function* delMedia({ payload: { resolve, reject, id } }: Models.Media.Sagas.DelMedia) {
  try {
    yield call(API.deleteMedia.bind(API), id);

    resolve(id);
    yield put({ type: Models.ActionTypes.mediaActions.DEL_MEDIA_SUCCESS });
  } catch (error) {
    reject(error);
    yield put({ type: Models.ActionTypes.mediaActions.DEL_MEDIA_FAILURE, payload: error });
  }
}

function* getMediaResources({ payload: { resolve, reject, id } }: Models.Media.Sagas.GetMediaResources) {
  try {
    const payload = yield call(API.getMediaResources.bind(API), id);

    resolve(payload);
    yield put({ type: Models.ActionTypes.mediaActions.GET_MEDIA_RESOURCES_SUCCESS, payload });
  } catch (error) {
    reject(error);
    yield put({ type: Models.ActionTypes.mediaActions.GET_MEDIA_RESOURCES_FAILURE, payload: error });
  }
}

function* updMediaResource({ payload: { resolve, reject, data } }: Models.Media.Sagas.UpdMediaResource) {
  try {
    const payload = yield call(API.updateMediaResource.bind(API), data);

    resolve(payload);
    yield put({ type: Models.ActionTypes.mediaActions.UPD_MEDIA_RESOURCE_SUCCESS, payload });
  } catch (error) {
    reject(error);
    yield put({ type: Models.ActionTypes.mediaActions.UPD_MEDIA_RESOURCE_FAILURE, payload: error });
  }
}
