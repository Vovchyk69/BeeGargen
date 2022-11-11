import { takeLatest, call, put } from "redux-saga/effects";
import * as Models from "../../models";
import { API } from "../../services";

export default [
  takeLatest(Models.ActionTypes.resourceActions.GET_RESOURCE_REQUEST, getResource),
  takeLatest(Models.ActionTypes.resourceActions.GET_RESOURCES_REQUEST, getResources),
  takeLatest(Models.ActionTypes.resourceActions.ADD_RESOURCE_REQUEST, addResource),
  takeLatest(Models.ActionTypes.resourceActions.UPD_RESOURCE_REQUEST, updResource),
  takeLatest(Models.ActionTypes.resourceActions.DEL_RESOURCE_REQUEST, delResource),
];

function* getResource({ payload: { resolve, reject, id } }: Models.Resource.Sagas.GetResource) {
  try {
    const payload = yield call(API.getResource.bind(API), id);

    resolve(payload);
    yield put({ type: Models.ActionTypes.resourceActions.GET_RESOURCE_SUCCESS, payload });
  } catch (error) {
    reject(error);
    yield put({ type: Models.ActionTypes.resourceActions.GET_RESOURCE_FAILURE, payload: error });
  }
}

function* getResources({ payload: { resolve, reject } }: Models.Resource.Sagas.GetResources) {
  try {
    const payload = yield call(API.getResources.bind(API));

    resolve(payload);
    yield put({ type: Models.ActionTypes.resourceActions.GET_RESOURCES_SUCCESS, payload });
  } catch (error) {
    reject(error);
    yield put({ type: Models.ActionTypes.resourceActions.GET_RESOURCES_FAILURE, payload: error });
  }
}

function* addResource({ payload: { resolve, reject, data } }: Models.Resource.Sagas.AddResource) {
  try {
    const payload = yield call(API.createResource.bind(API), data);

    resolve(payload);
    yield put({ type: Models.ActionTypes.resourceActions.ADD_RESOURCE_SUCCESS, payload });
  } catch (error) {
    reject(error);
    yield put({ type: Models.ActionTypes.resourceActions.ADD_RESOURCE_FAILURE, payload: error });
  }
}

function* updResource({ payload: { resolve, reject, data } }: Models.Resource.Sagas.UpdResource) {
  try {
    const payload = yield call(API.updateResource.bind(API), data);

    resolve(payload);
    yield put({ type: Models.ActionTypes.resourceActions.UPD_RESOURCE_SUCCESS, payload });
  } catch (error) {
    reject(error);
    yield put({ type: Models.ActionTypes.resourceActions.UPD_RESOURCE_FAILURE, payload: error });
  }
}

function* delResource({ payload: { resolve, reject, id } }: Models.Resource.Sagas.DelResource) {
  try {
    yield call(API.deleteResource.bind(API), id);

    resolve(id);
    yield put({ type: Models.ActionTypes.resourceActions.DEL_RESOURCE_SUCCESS });
  } catch (error) {
    reject(error);
    yield put({ type: Models.ActionTypes.resourceActions.DEL_RESOURCE_FAILURE, payload: error });
  }
}
