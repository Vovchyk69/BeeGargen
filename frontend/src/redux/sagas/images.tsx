import { takeLatest, call, put } from "redux-saga/effects";
import * as Models from "../../models";
import { API } from "../../services";

export default [
  takeLatest(Models.ActionTypes.imagesActions.ADD_IMAGE_REQUEST, addImage),
  takeLatest(Models.ActionTypes.imagesActions.DEL_IMAGE_REQUEST, delImage),
];

function* addImage({ payload: { resolve, reject, data } }: Models.Images.Sagas.AddImage) {
  try {
    const payload = yield call(API.uploadImage.bind(API), data);

    resolve(payload);
    yield put({ type: Models.ActionTypes.imagesActions.ADD_IMAGE_SUCCESS, payload });
  } catch (error) {
    reject(error);
    yield put({ type: Models.ActionTypes.imagesActions.ADD_IMAGE_FAILURE, payload: error });
  }
}

function* delImage({ payload: { resolve, reject, data } }: Models.Images.Sagas.DelImage) {
  try {
    yield call(API.deleteImage.bind(API), data);

    resolve(data.data);
    yield put({ type: Models.ActionTypes.imagesActions.DEL_IMAGE_SUCCESS });
  } catch (error) {
    reject(error);
    yield put({ type: Models.ActionTypes.imagesActions.DEL_IMAGE_FAILURE, payload: error });
  }
}
