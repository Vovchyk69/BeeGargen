import { takeLatest, call, put } from "redux-saga/effects";
import * as Models from "../../models";
import { API } from "../../services";

export default [
  takeLatest(Models.ActionTypes.userActions.GET_USER_REQUEST, getUser)
];

function* getUser({ payload: { resolve, reject } }: Models.User.Sagas.GetUser) {
  try {
    const payload = yield call(API.getMe.bind(API));

    resolve(payload);
    yield put({ type: Models.ActionTypes.userActions.GET_USER_SUCCESS, payload });
  } catch (error) {
    reject(error);
    yield put({ type: Models.ActionTypes.userActions.GET_USER_FAILURE, payload: error });
  }
}
