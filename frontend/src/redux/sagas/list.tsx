import { takeLatest, call, put } from "redux-saga/effects";
import * as Models from "../../models";
import { API } from "../../services";

export default [
  takeLatest(Models.ActionTypes.listActions.FETCH_LIST_REQUEST, fetchList)
];

type FetchList = {
  type: string;
  payload: {
    resolve: (list: any[]) => void;
    reject: (error: string) => void;
  };
};

function* fetchList({ payload: { resolve, reject } }: FetchList) {
  try {
    const list = yield call(API.getMe);

    resolve(list);

    yield put({
      type: Models.ActionTypes.listActions.FETCH_LIST_SUCCESS,
      payload: list
    });
  } catch (error) {
    reject(error);

    yield put({
      type: Models.ActionTypes.listActions.FETCH_LIST_FAILURE,
      payload: error
    });
  }
}
